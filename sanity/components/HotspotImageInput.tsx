'use client'

import React, { useState, useRef, useCallback } from 'react'
import { ObjectInputProps, set, unset, useClient } from 'sanity'
import { Stack, Card, Text, Box, Flex, Button, TextInput, TextArea, Dialog, Select } from '@sanity/ui'
import { TrashIcon, AddIcon } from '@sanity/icons'

interface Hotspot {
    _key: string
    x: number
    y: number
    title: string
    description: string
    type: 'problem' | 'improvement' | 'neutral'
}

interface HotspotImageValue {
    image?: {
        asset?: {
            _ref: string
        }
    }
    hotspots?: Hotspot[]
}

/**
 * Custom input component for placing hotspots on an image
 * Click on the image to add a hotspot, drag to reposition, click hotspot to edit
 */
export function HotspotImageInput(props: ObjectInputProps<HotspotImageValue>) {
    const { value, onChange, renderDefault } = props
    const client = useClient({ apiVersion: '2024-01-01' })
    const imageRef = useRef<HTMLDivElement>(null)

    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [editingHotspot, setEditingHotspot] = useState<Hotspot | null>(null)
    const [isAddMode, setIsAddMode] = useState(false)
    const [draggingKey, setDraggingKey] = useState<string | null>(null)

    // Fetch image URL when asset changes
    React.useEffect(() => {
        const assetRef = value?.image?.asset?._ref
        if (assetRef) {
            client.fetch(`*[_id == $id][0].url`, { id: assetRef }).then((url) => {
                setImageUrl(url)
            })
        } else {
            setImageUrl(null)
        }
    }, [value?.image?.asset?._ref, client])

    // Filter to only valid hotspots with x and y coordinates
    const hotspots = (value?.hotspots || []).filter(
        (h): h is Hotspot => h && typeof h.x === 'number' && typeof h.y === 'number' && typeof h._key === 'string'
    )

    const handleImageClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!isAddMode || !imageRef.current) return

        const rect = imageRef.current.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100

        const newHotspot: Hotspot = {
            _key: `hotspot-${Date.now()}`,
            x: Math.round(x * 100) / 100,
            y: Math.round(y * 100) / 100,
            title: '',
            description: '',
            type: 'neutral',
        }

        setEditingHotspot(newHotspot)
        setIsAddMode(false)
    }, [isAddMode])

    const handleHotspotClick = useCallback((e: React.MouseEvent, hotspot: Hotspot) => {
        e.stopPropagation()
        if (!draggingKey) {
            setEditingHotspot(hotspot)
        }
    }, [draggingKey])

    const handleHotspotDragStart = useCallback((e: React.MouseEvent, hotspot: Hotspot) => {
        e.preventDefault()
        setDraggingKey(hotspot._key)
    }, [])

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!draggingKey || !imageRef.current) return

        const rect = imageRef.current.getBoundingClientRect()
        const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
        const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))

        const updatedHotspots = hotspots.map(h =>
            h._key === draggingKey
                ? { ...h, x: Math.round(x * 100) / 100, y: Math.round(y * 100) / 100 }
                : h
        )

        onChange(set(updatedHotspots, ['hotspots']))
    }, [draggingKey, hotspots, onChange])

    const handleMouseUp = useCallback(() => {
        setDraggingKey(null)
    }, [])

    const saveHotspot = useCallback((hotspot: Hotspot) => {
        const existingIndex = hotspots.findIndex(h => h._key === hotspot._key)

        let updatedHotspots: Hotspot[]
        if (existingIndex >= 0) {
            updatedHotspots = hotspots.map(h => h._key === hotspot._key ? hotspot : h)
        } else {
            updatedHotspots = [...hotspots, hotspot]
        }

        onChange(set(updatedHotspots, ['hotspots']))
        setEditingHotspot(null)
    }, [hotspots, onChange])

    const deleteHotspot = useCallback((key: string) => {
        const updatedHotspots = hotspots.filter(h => h._key !== key)
        onChange(set(updatedHotspots, ['hotspots']))
        setEditingHotspot(null)
    }, [hotspots, onChange])

    const getHotspotColor = (type: string) => {
        switch (type) {
            case 'problem': return '#ef4444'
            case 'improvement': return '#22c55e'
            default: return '#3b82f6'
        }
    }

    return (
        <Stack space={4}>
            {/* Render the default image field */}
            <Box>
                <Text size={1} weight="semibold" style={{ marginBottom: 8 }}>Image</Text>
                {renderDefault({
                    ...props,
                    value: value?.image,
                    path: [...props.path, 'image'],
                } as any)}
            </Box>

            {/* Hotspot editor */}
            {imageUrl && (
                <Card padding={3} radius={2} shadow={1}>
                    <Stack space={3}>
                        <Flex justify="space-between" align="center">
                            <Text size={1} weight="semibold">Hotspots</Text>
                            <Button
                                icon={AddIcon}
                                text={isAddMode ? 'Click on image...' : 'Add Hotspot'}
                                tone={isAddMode ? 'positive' : 'default'}
                                mode={isAddMode ? 'default' : 'ghost'}
                                onClick={() => setIsAddMode(!isAddMode)}
                            />
                        </Flex>

                        {isAddMode && (
                            <Card padding={2} tone="positive" radius={2}>
                                <Text size={1}>Click anywhere on the image to place a hotspot</Text>
                            </Card>
                        )}

                        {/* Image with hotspots */}
                        <Box
                            ref={imageRef}
                            style={{
                                position: 'relative',
                                cursor: isAddMode ? 'crosshair' : 'default',
                                userSelect: 'none',
                            }}
                            onClick={handleImageClick}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                        >
                            <img
                                src={imageUrl}
                                alt="Hotspot image"
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    display: 'block',
                                    borderRadius: 4,
                                }}
                                draggable={false}
                            />

                            {/* Render hotspots */}
                            {hotspots.map((hotspot, index) => {
                                // Skip invalid hotspots
                                if (typeof hotspot.x !== 'number' || typeof hotspot.y !== 'number') {
                                    return null;
                                }
                                return (
                                    <div
                                        key={hotspot._key}
                                        style={{
                                            position: 'absolute',
                                            left: `${hotspot.x}%`,
                                            top: `${hotspot.y}%`,
                                            transform: 'translate(-50%, -50%)',
                                            width: 28,
                                            height: 28,
                                            borderRadius: '50%',
                                            backgroundColor: getHotspotColor(hotspot.type || 'neutral'),
                                            border: '3px solid white',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                                            cursor: draggingKey === hotspot._key ? 'grabbing' : 'grab',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: 'white',
                                            fontSize: 12,
                                            fontWeight: 'bold',
                                            zIndex: draggingKey === hotspot._key ? 10 : 1,
                                        }}
                                        onClick={(e) => handleHotspotClick(e, hotspot)}
                                        onMouseDown={(e) => handleHotspotDragStart(e, hotspot)}
                                    >
                                        {index + 1}
                                    </div>
                                );
                            })}
                        </Box>

                        {/* Hotspot list */}
                        {hotspots.length > 0 && (
                            <Stack space={2}>
                                <Text size={1} muted>Click a hotspot to edit, drag to reposition</Text>
                                {hotspots.map((hotspot, index) => {
                                    // Skip invalid hotspots
                                    if (typeof hotspot.x !== 'number' || typeof hotspot.y !== 'number') {
                                        return null;
                                    }
                                    return (
                                        <Card
                                            key={hotspot._key}
                                            padding={2}
                                            radius={2}
                                            tone="default"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => setEditingHotspot(hotspot)}
                                        >
                                            <Flex align="center" gap={2}>
                                                <div
                                                    style={{
                                                        width: 20,
                                                        height: 20,
                                                        borderRadius: '50%',
                                                        backgroundColor: getHotspotColor(hotspot.type || 'neutral'),
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: 'white',
                                                        fontSize: 10,
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    {index + 1}
                                                </div>
                                                <Box flex={1}>
                                                    <Text size={1} weight="medium">
                                                        {hotspot.title || 'Untitled'}
                                                    </Text>
                                                    <Text size={0} muted>
                                                        {hotspot.type || 'neutral'} · ({hotspot.x.toFixed(1)}%, {hotspot.y.toFixed(1)}%)
                                                    </Text>
                                                </Box>
                                                <Button
                                                    icon={TrashIcon}
                                                    mode="bleed"
                                                    tone="critical"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        deleteHotspot(hotspot._key)
                                                    }}
                                                />
                                            </Flex>
                                        </Card>
                                    );
                                })}
                            </Stack>
                        )}
                    </Stack>
                </Card>
            )}

            {/* Edit hotspot dialog */}
            {editingHotspot && (
                <Dialog
                    header="Edit Hotspot"
                    id="hotspot-dialog"
                    onClose={() => setEditingHotspot(null)}
                    zOffset={1000}
                    width={1}
                >
                    <Box padding={4}>
                        <Stack space={4}>
                            <Stack space={2}>
                                <Text size={1} weight="semibold">Type</Text>
                                <Select
                                    value={editingHotspot.type}
                                    onChange={(e) => setEditingHotspot({
                                        ...editingHotspot,
                                        type: e.currentTarget.value as Hotspot['type']
                                    })}
                                >
                                    <option value="problem">Problem (Red)</option>
                                    <option value="improvement">Improvement (Green)</option>
                                    <option value="neutral">Neutral (Blue)</option>
                                </Select>
                            </Stack>

                            <Stack space={2}>
                                <Text size={1} weight="semibold">Title</Text>
                                <TextInput
                                    value={editingHotspot.title}
                                    onChange={(e) => setEditingHotspot({
                                        ...editingHotspot,
                                        title: e.currentTarget.value
                                    })}
                                    placeholder="e.g., Cluttered toolbar"
                                />
                            </Stack>

                            <Stack space={2}>
                                <Text size={1} weight="semibold">Description</Text>
                                <TextArea
                                    value={editingHotspot.description}
                                    onChange={(e) => setEditingHotspot({
                                        ...editingHotspot,
                                        description: e.currentTarget.value
                                    })}
                                    placeholder="Describe the issue or improvement..."
                                    rows={3}
                                />
                            </Stack>

                            <Flex gap={2} justify="flex-end">
                                <Button
                                    text="Cancel"
                                    mode="ghost"
                                    onClick={() => setEditingHotspot(null)}
                                />
                                <Button
                                    text="Save"
                                    tone="positive"
                                    onClick={() => saveHotspot(editingHotspot)}
                                />
                            </Flex>
                        </Stack>
                    </Box>
                </Dialog>
            )}
        </Stack>
    )
}
