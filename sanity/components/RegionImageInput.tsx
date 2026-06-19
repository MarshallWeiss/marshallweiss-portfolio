'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { ObjectInputProps, set, useClient } from 'sanity'
import { Stack, Card, Text, Box, Flex, Button, TextInput, TextArea, Dialog, Switch } from '@sanity/ui'
import { TrashIcon, AddIcon } from '@sanity/icons'

interface Region {
    _key: string
    x: number
    y: number
    w: number
    h: number
    title: string
    description: string
    fullPage?: boolean
}

interface RegionImageValue {
    image?: { asset?: { _ref: string } }
    regions?: Region[]
}

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n))
const r1 = (n: number) => Math.round(n * 10) / 10

type DragState =
    | { mode: 'draw'; startX: number; startY: number }
    | { mode: 'move'; key: string; offX: number; offY: number }
    | { mode: 'resize'; key: string }
    | null

/**
 * Custom input for the Spotlight Tour block. Lets an editor draw rectangular
 * highlight regions directly on the uploaded image (drag to draw, drag to move,
 * corner handle to resize, click to edit). Regions are stored as percentages so
 * they stay aligned at any render size. All other fields render normally below.
 */
export function RegionImageInput(props: ObjectInputProps<RegionImageValue>) {
    const { value, onChange, renderDefault } = props
    const client = useClient({ apiVersion: '2024-01-01' })
    const imageRef = useRef<HTMLDivElement>(null)
    const dragRef = useRef<DragState>(null)

    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [addMode, setAddMode] = useState(false)
    const [draft, setDraft] = useState<Region | null>(null)
    const [editing, setEditing] = useState<Region | null>(null)
    const movedRef = useRef(false)

    useEffect(() => {
        const ref = value?.image?.asset?._ref
        if (!ref) { setImageUrl(null); return }
        client.fetch<string>(`*[_id == $id][0].url`, { id: ref }).then(setImageUrl)
    }, [value?.image?.asset?._ref, client])

    const regions = (value?.regions || []).filter(
        (rg): rg is Region => rg && typeof rg.x === 'number' && typeof rg._key === 'string'
    )

    const pct = (e: { clientX: number; clientY: number }) => {
        const rect = imageRef.current!.getBoundingClientRect()
        return {
            x: clamp(((e.clientX - rect.left) / rect.width) * 100),
            y: clamp(((e.clientY - rect.top) / rect.height) * 100),
        }
    }

    const writeRegions = useCallback((next: Region[]) => onChange(set(next, ['regions'])), [onChange])

    const onMouseDownImage = useCallback((e: React.MouseEvent) => {
        if (!addMode || !imageRef.current) return
        const p = pct(e)
        dragRef.current = { mode: 'draw', startX: p.x, startY: p.y }
        setDraft({ _key: `region-${Date.now()}`, x: p.x, y: p.y, w: 0, h: 0, title: '', description: '' })
    }, [addMode])

    const onRegionMouseDown = useCallback((e: React.MouseEvent, rg: Region) => {
        e.stopPropagation()
        movedRef.current = false
        const p = pct(e)
        dragRef.current = { mode: 'move', key: rg._key, offX: p.x - rg.x, offY: p.y - rg.y }
    }, [])

    const onHandleMouseDown = useCallback((e: React.MouseEvent, rg: Region) => {
        e.stopPropagation()
        movedRef.current = true
        dragRef.current = { mode: 'resize', key: rg._key }
    }, [])

    const onMouseMove = useCallback((e: React.MouseEvent) => {
        const d = dragRef.current
        if (!d || !imageRef.current) return
        const p = pct(e)
        if (d.mode === 'draw') {
            setDraft(prev => prev && ({
                ...prev,
                x: r1(Math.min(d.startX, p.x)),
                y: r1(Math.min(d.startY, p.y)),
                w: r1(Math.abs(p.x - d.startX)),
                h: r1(Math.abs(p.y - d.startY)),
            }))
        } else if (d.mode === 'move') {
            movedRef.current = true
            writeRegions(regions.map(rg => rg._key === d.key
                ? { ...rg, x: r1(clamp(p.x - d.offX, 0, 100 - rg.w)), y: r1(clamp(p.y - d.offY, 0, 100 - rg.h)) }
                : rg))
        } else if (d.mode === 'resize') {
            writeRegions(regions.map(rg => rg._key === d.key
                ? { ...rg, w: r1(clamp(p.x - rg.x, 1, 100 - rg.x)), h: r1(clamp(p.y - rg.y, 1, 100 - rg.y)) }
                : rg))
        }
    }, [regions, writeRegions])

    const onMouseUp = useCallback(() => {
        const d = dragRef.current
        dragRef.current = null
        if (d?.mode === 'draw' && draft) {
            if (draft.w >= 1 && draft.h >= 1) {
                writeRegions([...regions, draft])
                setEditing(draft)
            }
            setDraft(null)
            setAddMode(false)
        }
    }, [draft, regions, writeRegions])

    const saveRegion = useCallback((rg: Region) => {
        const exists = regions.some(r => r._key === rg._key)
        writeRegions(exists ? regions.map(r => r._key === rg._key ? rg : r) : [...regions, rg])
        setEditing(null)
    }, [regions, writeRegions])

    const deleteRegion = useCallback((key: string) => {
        writeRegions(regions.filter(r => r._key !== key))
        setEditing(null)
    }, [regions, writeRegions])

    const COLORS = ['#BE7257', '#7C9CB0', '#D29A57', '#B58AA0', '#9DB29C', '#8C7BB0', '#C77B7B']

    return (
        <Stack space={4}>
            {imageUrl && (
                <Card padding={3} radius={2} shadow={1}>
                    <Stack space={3}>
                        <Flex justify="space-between" align="center">
                            <Text size={1} weight="semibold">Highlight regions</Text>
                            <Button
                                icon={AddIcon}
                                text={addMode ? 'Drag a box on the image…' : 'Draw region'}
                                tone={addMode ? 'positive' : 'default'}
                                mode={addMode ? 'default' : 'ghost'}
                                onClick={() => setAddMode(m => !m)}
                            />
                        </Flex>

                        <Box
                            ref={imageRef}
                            style={{ position: 'relative', cursor: addMode ? 'crosshair' : 'default', userSelect: 'none' }}
                            onMouseDown={onMouseDownImage}
                            onMouseMove={onMouseMove}
                            onMouseUp={onMouseUp}
                            onMouseLeave={onMouseUp}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imageUrl} alt="" draggable={false} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 4 }} />

                            {regions.map((rg, i) => {
                                const color = COLORS[i % COLORS.length]
                                return (
                                    <div
                                        key={rg._key}
                                        onMouseDown={(e) => onRegionMouseDown(e, rg)}
                                        onClick={(e) => { e.stopPropagation(); if (!movedRef.current) setEditing(rg) }}
                                        style={{
                                            position: 'absolute', left: `${rg.x}%`, top: `${rg.y}%`, width: `${rg.w}%`, height: `${rg.h}%`,
                                            border: `2px solid ${color}`, background: `${color}22`, borderRadius: 4,
                                            cursor: 'move', boxSizing: 'border-box', zIndex: 2,
                                        }}
                                    >
                                        <span style={{ position: 'absolute', top: -1, left: -1, background: color, color: '#fff', fontSize: 11, fontWeight: 700, padding: '0 4px', borderRadius: '3px 0 3px 0' }}>{i + 1}</span>
                                        <div
                                            onMouseDown={(e) => onHandleMouseDown(e, rg)}
                                            style={{ position: 'absolute', right: -5, bottom: -5, width: 11, height: 11, background: '#fff', border: `2px solid ${color}`, borderRadius: 2, cursor: 'nwse-resize' }}
                                        />
                                    </div>
                                )
                            })}

                            {draft && (
                                <div style={{ position: 'absolute', left: `${draft.x}%`, top: `${draft.y}%`, width: `${draft.w}%`, height: `${draft.h}%`, border: '2px dashed #BE7257', background: '#BE725722', borderRadius: 4, pointerEvents: 'none' }} />
                            )}
                        </Box>

                        {addMode && (
                            <Card padding={2} tone="positive" radius={2}><Text size={1}>Drag a rectangle over the area you want to highlight.</Text></Card>
                        )}

                        {regions.length > 0 && (
                            <Stack space={2}>
                                <Text size={1} muted>Click a box to edit · drag to move · corner to resize</Text>
                                {regions.map((rg, i) => (
                                    <Card key={rg._key} padding={2} radius={2} tone="default" style={{ cursor: 'pointer' }} onClick={() => setEditing(rg)}>
                                        <Flex align="center" gap={2}>
                                            <div style={{ width: 20, height: 20, borderRadius: 4, background: COLORS[i % COLORS.length], color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{i + 1}</div>
                                            <Box flex={1}>
                                                <Text size={1} weight="medium">{rg.title || 'Untitled'}</Text>
                                                <Text size={0} muted>{rg.fullPage ? 'Whole page' : `${rg.x.toFixed(0)},${rg.y.toFixed(0)} · ${rg.w.toFixed(0)}×${rg.h.toFixed(0)}`}</Text>
                                            </Box>
                                            <Button icon={TrashIcon} mode="bleed" tone="critical" onClick={(e) => { e.stopPropagation(); deleteRegion(rg._key) }} />
                                        </Flex>
                                    </Card>
                                ))}
                            </Stack>
                        )}
                    </Stack>
                </Card>
            )}

            {/* All normal fields (image upload, headline, text, regions array, layout…) */}
            {renderDefault(props)}

            {editing && (
                <Dialog header="Edit region" id="region-dialog" onClose={() => setEditing(null)} zOffset={1000} width={1}>
                    <Box padding={4}>
                        <Stack space={4}>
                            <Stack space={2}>
                                <Text size={1} weight="semibold">Title</Text>
                                <TextInput value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.currentTarget.value })} placeholder="e.g., New submenu" />
                            </Stack>
                            <Stack space={2}>
                                <Text size={1} weight="semibold">Description</Text>
                                <TextArea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.currentTarget.value })} rows={3} placeholder="What changed here…" />
                            </Stack>
                            <Flex align="center" gap={3}>
                                <Switch checked={!!editing.fullPage} onChange={(e) => setEditing({ ...editing, fullPage: e.currentTarget.checked })} />
                                <Box flex={1}>
                                    <Text size={1} weight="semibold">Highlight whole page</Text>
                                    <Text size={0} muted>Outlines the entire page with no dimming (for a “wider page” style step).</Text>
                                </Box>
                            </Flex>
                            <Flex gap={2} justify="space-between">
                                <Button text="Delete" icon={TrashIcon} mode="ghost" tone="critical" onClick={() => deleteRegion(editing._key)} />
                                <Flex gap={2}>
                                    <Button text="Cancel" mode="ghost" onClick={() => setEditing(null)} />
                                    <Button text="Save" tone="positive" onClick={() => saveRegion(editing)} />
                                </Flex>
                            </Flex>
                        </Stack>
                    </Box>
                </Dialog>
            )}
        </Stack>
    )
}
