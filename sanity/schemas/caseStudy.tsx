import { defineField, defineType } from 'sanity'
import { MultipleImageInput } from '../components/MultipleImageInput'
import { ImagePreview } from '../components/ImagePreview'

export default defineType({
    name: 'caseStudy',
    title: 'Case Study',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'images',
            title: 'Images',
            description: 'Use "Select Files" button to upload multiple images at once. Filenames are shown automatically.',
            type: 'array',
            components: {
                input: MultipleImageInput,
            },
            of: [{
                type: 'image',
                options: { 
                    hotspot: true,
                },
                fields: [
                    {
                        name: 'alt',
                        type: 'string',
                        title: 'Alt text',
                        description: 'Auto-filled from filename, but can be edited',
                    },
                    {
                        name: 'caption',
                        type: 'string',
                        title: 'Caption',
                        description: 'Optional caption',
                    }
                ],
                components: {
                    preview: ImagePreview,
                },
                preview: {
                    select: {
                        asset: 'asset',
                        alt: 'alt',
                        caption: 'caption',
                    },
                },
            }],
        }),
        defineField({
            name: 'modules',
            title: 'Modules',
            type: 'array',
            of: [
                // Hero Block
                defineField({
                    name: 'hero',
                    title: 'Hero',
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', type: 'string', title: 'Title' }),
                        defineField({ name: 'subtitle', type: 'string', title: 'Subtitle (Role/Tools)' }),
                        defineField({ name: 'intro', type: 'text', title: 'Introduction' }),
                        defineField({ name: 'image', type: 'image', title: 'Cover Image', options: { hotspot: true } }),
                    ],
                }),
                // Metadata Block
                defineField({
                    name: 'metadata',
                    title: 'Metadata',
                    type: 'object',
                    fields: [
                        defineField({ name: 'role', type: 'string', title: 'Role' }),
                        defineField({ name: 'client', type: 'string', title: 'Client' }),
                        defineField({ name: 'year', type: 'string', title: 'Year' }),
                    ],
                }),
                // Split Media Block
                defineField({
                    name: 'splitMedia',
                    title: 'Split Media',
                    type: 'object',
                    fields: [
                        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
                        defineField({ name: 'text', type: 'text', title: 'Text' }),
                        defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
                        defineField({ name: 'reverseLayout', type: 'boolean', title: 'Reverse Layout (Image on Left)', initialValue: false }),
                    ],
                }),
                // Media Grid Block
                defineField({
                    name: 'mediaGrid',
                    title: 'Media Grid',
                    type: 'object',
                    fields: [
                        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
                        defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
                        defineField({
                            name: 'images',
                            title: 'Images',
                            type: 'array',
                            of: [{ type: 'image', options: { hotspot: true } }],
                        }),
                        defineField({
                            name: 'columns',
                            title: 'Columns',
                            type: 'string',
                            options: {
                                list: [
                                    { title: '1 Column', value: '1' },
                                    { title: '2 Columns', value: '2' },
                                    { title: '3 Columns', value: '3' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: '2',
                        }),
                    ],
                }),
                // Full Width Media Block
                defineField({
                    name: 'fullWidthMedia',
                    title: 'Full Width Media',
                    type: 'object',
                    fields: [
                        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
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
                            hidden: ({ parent }) => parent?.mediaType !== 'video',
                        }),
                        defineField({ name: 'caption', type: 'string', title: 'Caption' }),
                    ],
                }),
                // Carousel Block
                defineField({
                    name: 'carousel',
                    title: 'Carousel Gallery',
                    type: 'object',
                    fields: [
                        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
                        defineField({
                            name: 'slides',
                            title: 'Slides',
                            type: 'array',
                            of: [{
                                type: 'object',
                                name: 'slide',
                                fields: [
                                    defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
                                    defineField({ name: 'title', type: 'string', title: 'Title' }),
                                    defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
                                ],
                                preview: {
                                    select: {
                                        title: 'title',
                                        media: 'image',
                                    },
                                },
                            }],
                            validation: Rule => Rule.required().min(2),
                        }),
                    ],
                }),
                // Accordion Block
                defineField({
                    name: 'accordion',
                    title: 'Accordion',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'layout',
                            title: 'Layout',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Full Width', value: 'fullWidth' },
                                    { title: 'Split (Text + Accordion)', value: 'split' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'fullWidth',
                        }),
                        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
                        defineField({
                            name: 'text',
                            type: 'text',
                            title: 'Body Text',
                            rows: 6,
                            description: 'Only shown in Split layout',
                            hidden: ({ parent }) => parent?.layout !== 'split',
                        }),
                        defineField({
                            name: 'items',
                            title: 'Accordion Items',
                            type: 'array',
                            of: [{
                                type: 'object',
                                name: 'accordionItem',
                                fields: [
                                    defineField({ name: 'title', type: 'string', title: 'Title' }),
                                    defineField({ name: 'content', type: 'text', title: 'Content', rows: 4 }),
                                ],
                                preview: {
                                    select: { title: 'title' },
                                },
                            }],
                        }),
                        defineField({
                            name: 'reverseLayout',
                            type: 'boolean',
                            title: 'Reverse Layout (Accordion on Left)',
                            initialValue: false,
                            hidden: ({ parent }) => parent?.layout !== 'split',
                        }),
                    ],
                }),
                // Content Cards Block
                defineField({
                    name: 'contentCards',
                    title: 'Content Cards',
                    type: 'object',
                    fields: [
                        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
                        defineField({ name: 'description', type: 'text', title: 'Description (optional)' }),
                        defineField({
                            name: 'style',
                            title: 'Card Style',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'White with border', value: 'bordered' },
                                    { title: 'Gray background', value: 'filled' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'bordered',
                        }),
                        defineField({
                            name: 'columns',
                            title: 'Columns',
                            type: 'string',
                            options: {
                                list: [
                                    { title: '2 Columns', value: '2' },
                                    { title: '3 Columns', value: '3' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: '3',
                        }),
                        defineField({
                            name: 'cards',
                            title: 'Cards',
                            type: 'array',
                            of: [{
                                type: 'object',
                                name: 'card',
                                fields: [
                                    defineField({ name: 'title', type: 'string', title: 'Card Title' }),
                                    defineField({ name: 'text', type: 'text', title: 'Paragraph Text', rows: 4 }),
                                    defineField({
                                        name: 'items',
                                        title: 'Bullet Points (optional)',
                                        type: 'array',
                                        of: [{ type: 'string' }],
                                    }),
                                ],
                                preview: {
                                    select: {
                                        title: 'title',
                                        text: 'text',
                                        items: 'items',
                                    },
                                    prepare({ title, text, items }) {
                                        const hasItems = items && items.length > 0;
                                        const hasText = text && text.length > 0;
                                        return {
                                            title: title || 'Untitled Card',
                                            subtitle: hasItems ? `${items.length} bullet points` : (hasText ? 'Has paragraph' : 'Empty'),
                                        }
                                    },
                                },
                            }],
                        }),
                    ],
                }),
                // Background Video Block
                defineField({
                    name: 'backgroundVideo',
                    title: 'Background Video',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'video',
                            type: 'mux.video',
                            title: 'Video',
                        }),
                        defineField({ name: 'heading', type: 'string', title: 'Heading' }),
                        defineField({ name: 'text', type: 'text', title: 'Text' }),
                        defineField({
                            name: 'overlayOpacity',
                            type: 'number',
                            title: 'Overlay Opacity (%)',
                            initialValue: 50,
                            validation: Rule => Rule.min(0).max(100)
                        }),
                        defineField({
                            name: 'overlayColor',
                            title: 'Overlay Color',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Dark', value: 'dark' },
                                    { title: 'Light', value: 'light' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'dark',
                        }),
                        defineField({
                            name: 'autoplay',
                            type: 'boolean',
                            title: 'Autoplay',
                            initialValue: true
                        }),
                        defineField({
                            name: 'loop',
                            type: 'boolean',
                            title: 'Loop',
                            initialValue: true
                        }),
                        defineField({
                            name: 'muted',
                            type: 'boolean',
                            title: 'Muted',
                            initialValue: true
                        }),
                    ],
                }),
                // Comparison Block
                defineField({
                    name: 'comparison',
                    title: 'Comparison',
                    type: 'object',
                    fields: [
                        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
                        defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
                        defineField({ name: 'leftImage', type: 'image', title: 'Left Image', options: { hotspot: true } }),
                        defineField({ name: 'leftLabel', type: 'string', title: 'Left Label' }),
                        defineField({ name: 'rightImage', type: 'image', title: 'Right Image', options: { hotspot: true } }),
                        defineField({ name: 'rightLabel', type: 'string', title: 'Right Label' }),
                    ],
                }),
            ],
        }),
    ],
})
