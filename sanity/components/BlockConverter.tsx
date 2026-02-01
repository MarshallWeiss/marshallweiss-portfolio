'use client'

import React from 'react'
import { ObjectInputProps, set } from 'sanity'
import { Stack, Button, Menu, MenuButton, MenuItem, Box, Card, Flex, Text } from '@sanity/ui'
import { EllipsisVerticalIcon, SyncIcon } from '@sanity/icons'

/**
 * Custom input component that adds conversion functionality to block objects
 * This wraps the entire object input and adds a conversion menu at the top
 */
export function BlockWithConverter(props: ObjectInputProps) {
    const { renderDefault, value, onChange, schemaType } = props

    // Define available block types
    const blockTypes = [
        { value: 'hero', title: 'Hero', icon: '🦸' },
        { value: 'metadata', title: 'Metadata', icon: '📋' },
        { value: 'splitMedia', title: 'Split Media', icon: '↔️' },
        { value: 'mediaGrid', title: 'Media Grid', icon: '🔲' },
        { value: 'fullWidthMedia', title: 'Full Width Media', icon: '🖼️' },
        { value: 'carousel', title: 'Carousel', icon: '🎠' },
        { value: 'backgroundVideo', title: 'Background Video', icon: '🎬' },
        { value: 'contentCards', title: 'Content Cards', icon: '🃏' },
        { value: 'accordion', title: 'Accordion', icon: '📁' },
        { value: 'comparison', title: 'Comparison', icon: '⚖️' },
        { value: 'annotatedImage', title: 'Annotated Image', icon: '📍' },
    ]

    const currentType = value?._type
    const currentTypeInfo = blockTypes.find(t => t.value === currentType)
    const availableTypes = blockTypes.filter(t => t.value !== currentType)

    /**
     * Convert a block from one type to another, mapping compatible fields
     */
    const convertBlock = (newType: string) => {
        const oldData = value || {}
        const newData: any = {
            _type: newType,
            _key: oldData._key || `${Date.now()}`,
        }

        // Generic field mappings that work across many block types
        const commonFields = ['headline', 'description', 'image', 'text']
        commonFields.forEach(field => {
            if (oldData[field] !== undefined) {
                newData[field] = oldData[field]
            }
        })

        // Type-specific conversions
        switch (newType) {
            case 'carousel':
                // Convert cards to carousel slides
                if (oldData.cards && Array.isArray(oldData.cards)) {
                    newData.slides = oldData.cards.map((card: any, index: number) => ({
                        _key: `slide-${Date.now()}-${index}`,
                        image: card.image || undefined,
                        title: card.title || '',
                        description: card.text || (card.items ? card.items.join('\n') : ''),
                    }))
                }
                // Convert accordion items to slides
                else if (oldData.items && Array.isArray(oldData.items)) {
                    newData.slides = oldData.items.map((item: any, index: number) => ({
                        _key: `slide-${Date.now()}-${index}`,
                        image: item.image || undefined,
                        title: item.title || '',
                        description: item.content || '',
                    }))
                }
                // Convert single image to first slide
                else if (oldData.image) {
                    newData.slides = [{
                        _key: `slide-${Date.now()}`,
                        image: oldData.image,
                        title: oldData.headline || oldData.title || '',
                        description: oldData.description || oldData.text || '',
                    }]
                }
                // Create at least one empty slide if no content
                else {
                    newData.slides = [{
                        _key: `slide-${Date.now()}`,
                        title: oldData.headline || oldData.title || '',
                        description: oldData.description || oldData.text || '',
                    }]
                }
                break

            case 'splitMedia':
                // Map various text fields
                newData.headline = oldData.headline || oldData.title || oldData.heading || ''
                newData.text = oldData.text || oldData.description || oldData.intro || ''
                newData.image = oldData.image || oldData.leftImage || oldData.rightImage
                newData.reverseLayout = oldData.reverseLayout || false
                break

            case 'fullWidthMedia':
                newData.headline = oldData.headline || oldData.title || oldData.heading || ''
                newData.mediaType = 'image'
                newData.image = oldData.image
                newData.caption = oldData.caption || ''
                break

            case 'hero':
                newData.title = oldData.title || oldData.headline || oldData.heading || ''
                newData.subtitle = oldData.subtitle || ''
                newData.intro = oldData.intro || oldData.text || oldData.description || ''
                newData.image = oldData.image
                break

            case 'mediaGrid':
                newData.headline = oldData.headline || oldData.title || ''
                newData.description = oldData.description || oldData.text || ''
                newData.columns = '2'
                // Convert carousel slides with images to image grid
                if (oldData.slides && Array.isArray(oldData.slides)) {
                    newData.images = oldData.slides
                        .filter((slide: any) => slide.image)
                        .map((slide: any) => slide.image)
                }
                // Convert single image to array
                else if (oldData.image) {
                    newData.images = [oldData.image]
                }
                // Use existing images array
                else if (oldData.images) {
                    newData.images = oldData.images
                }
                // Empty array if no images
                else {
                    newData.images = []
                }
                break

            case 'comparison':
                newData.headline = oldData.headline || oldData.title || ''
                newData.description = oldData.description || oldData.text || ''
                newData.leftImage = oldData.leftImage || oldData.image
                newData.leftLabel = oldData.leftLabel || 'Before'
                newData.rightImage = oldData.rightImage
                newData.rightLabel = oldData.rightLabel || 'After'
                break

            case 'annotatedImage':
                newData.headline = oldData.headline || oldData.title || ''
                newData.description = oldData.description || oldData.text || ''
                newData.image = oldData.image
                newData.hotspots = []
                newData.showLegend = true
                break

            case 'contentCards':
                newData.headline = oldData.headline || oldData.title || ''
                newData.description = oldData.description || ''
                newData.style = 'bordered'
                newData.columns = '3'
                // Convert carousel slides to cards
                if (oldData.slides && Array.isArray(oldData.slides)) {
                    newData.cards = oldData.slides.map((slide: any, index: number) => ({
                        _key: `card-${Date.now()}-${index}`,
                        title: slide.title || '',
                        text: slide.description || '',
                        items: [],
                    }))
                }
                // Convert accordion items to cards
                else if (oldData.items && Array.isArray(oldData.items)) {
                    newData.cards = oldData.items.map((item: any, index: number) => ({
                        _key: `card-${Date.now()}-${index}`,
                        title: item.title || '',
                        text: item.content || '',
                        items: [],
                    }))
                }
                // Start with empty cards array
                else {
                    newData.cards = []
                }
                break

            case 'accordion':
                newData.layout = 'fullWidth'
                newData.headline = oldData.headline || oldData.title || ''
                newData.text = oldData.text || oldData.description || ''
                // Convert carousel slides to accordion items
                if (oldData.slides && Array.isArray(oldData.slides)) {
                    newData.items = oldData.slides.map((slide: any, index: number) => ({
                        _key: `accordion-${Date.now()}-${index}`,
                        title: slide.title || '',
                        content: slide.description || '',
                    }))
                }
                // Convert cards to accordion items
                else if (oldData.cards && Array.isArray(oldData.cards)) {
                    newData.items = oldData.cards.map((card: any, index: number) => ({
                        _key: `accordion-${Date.now()}-${index}`,
                        title: card.title || '',
                        content: card.text || (card.items ? card.items.join('\n') : ''),
                    }))
                }
                // Start with empty items array
                else {
                    newData.items = []
                }
                break

            case 'backgroundVideo':
                newData.heading = oldData.heading || oldData.headline || oldData.title || ''
                newData.text = oldData.text || oldData.description || ''
                newData.overlayOpacity = 50
                newData.overlayColor = 'dark'
                newData.autoplay = true
                newData.loop = true
                newData.muted = true
                break
        }

        onChange(set(newData))
    }

    return (
        <Stack space={4}>
            {/* Conversion bar at the top */}
            <Card padding={3} radius={2} tone="primary" border>
                <Flex align="center" justify="space-between">
                    <Flex align="center" gap={2}>
                        <SyncIcon />
                        <Text size={1} weight="medium">
                            Current type: {currentTypeInfo?.icon} {currentTypeInfo?.title}
                        </Text>
                    </Flex>
                    <MenuButton
                        button={
                            <Button
                                icon={EllipsisVerticalIcon}
                                text="Convert to..."
                                mode="default"
                                tone="default"
                                fontSize={1}
                            />
                        }
                        id={`block-convert-menu-${value?._key}`}
                        menu={
                            <Menu>
                                {availableTypes.map(type => (
                                    <MenuItem
                                        key={type.value}
                                        text={`${type.icon} ${type.title}`}
                                        onClick={() => convertBlock(type.value)}
                                        fontSize={1}
                                    />
                                ))}
                            </Menu>
                        }
                        popover={{ portal: true, tone: 'default' }}
                    />
                </Flex>
            </Card>

            {/* Default block content */}
            {renderDefault(props)}
        </Stack>
    )
}
