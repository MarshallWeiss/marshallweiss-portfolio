import { defineField } from 'sanity'

/**
 * Universal field definitions for consistent block behavior
 */

// Layout & Spacing
export const layoutFields = [
    defineField({
        name: 'width',
        title: 'Container Width',
        type: 'string',
        options: {
            list: [
                { title: 'Contained (default)', value: 'contained' },
                { title: 'Wide', value: 'wide' },
                { title: 'Full Width', value: 'full' },
            ],
            layout: 'radio',
        },
        initialValue: 'contained',
    }),
    defineField({
        name: 'background',
        title: 'Background',
        type: 'string',
        options: {
            list: [
                { title: 'None', value: 'none' },
                { title: 'White', value: 'white' },
                { title: 'Gray', value: 'gray' },
            ],
            layout: 'radio',
        },
        initialValue: 'none',
    }),
    defineField({
        name: 'spacing',
        title: 'Vertical Spacing',
        type: 'string',
        options: {
            list: [
                { title: 'Compact', value: 'compact' },
                { title: 'Default', value: 'default' },
                { title: 'Spacious', value: 'spacious' },
            ],
            layout: 'radio',
        },
        initialValue: 'default',
    }),
]

// Typography
export const typographyFields = [
    defineField({
        name: 'textAlign',
        title: 'Text Alignment',
        type: 'string',
        options: {
            list: [
                { title: 'Left', value: 'left' },
                { title: 'Center', value: 'center' },
                { title: 'Right', value: 'right' },
            ],
            layout: 'radio',
        },
        initialValue: 'left',
    }),
]

// Media handling
export const aspectRatioField = defineField({
    name: 'aspectRatio',
    title: 'Aspect Ratio',
    type: 'string',
    options: {
        list: [
            { title: 'Auto (original)', value: 'auto' },
            { title: 'Square (1:1)', value: 'square' },
            { title: 'Landscape 4:3', value: '4:3' },
            { title: 'Landscape 16:9', value: '16:9' },
            { title: 'Portrait 3:4', value: '3:4' },
            { title: 'Portrait 9:16', value: '9:16' },
        ],
        layout: 'dropdown',
    },
    initialValue: 'auto',
})

export const objectFitField = defineField({
    name: 'objectFit',
    title: 'Image Fit',
    type: 'string',
    description: 'How the image should fit within its container',
    options: {
        list: [
            { title: 'Cover (fill, may crop)', value: 'cover' },
            { title: 'Contain (fit, no crop)', value: 'contain' },
        ],
        layout: 'radio',
    },
    initialValue: 'cover',
})

// Enhanced heading options
export const headingFields = [
    defineField({
        name: 'headline',
        type: 'string',
        title: 'Headline',
    }),
    defineField({
        name: 'subheading',
        type: 'string',
        title: 'Subheading (optional)',
    }),
    defineField({
        name: 'headlineSize',
        title: 'Headline Size',
        type: 'string',
        options: {
            list: [
                { title: 'Small', value: 'small' },
                { title: 'Medium', value: 'medium' },
                { title: 'Large', value: 'large' },
            ],
            layout: 'radio',
        },
        initialValue: 'medium',
    }),
]

// Universal media item (supports both image and video)
export const mediaItemFields = [
    defineField({
        name: 'mediaType',
        title: 'Media Type',
        type: 'string',
        options: {
            list: [
                { title: 'Image', value: 'image' },
                { title: 'Video', value: 'video' },
            ],
            layout: 'radio',
        },
        initialValue: 'image',
    }),
    defineField({
        name: 'image',
        type: 'image',
        title: 'Image',
        options: { hotspot: true },
        hidden: ({ parent }) => parent?.mediaType === 'video',
    }),
    defineField({
        name: 'video',
        type: 'mux.video',
        title: 'Video',
        hidden: ({ parent }) => parent?.mediaType === 'image',
    }),
    aspectRatioField,
    objectFitField,
]
