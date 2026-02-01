import { defineField, defineType } from 'sanity'
import { MultipleImageInput } from '../components/MultipleImageInput'
import { ImagePreview } from '../components/ImagePreview'
import { HotspotImageInput } from '../components/HotspotImageInput'
import { BlockWithConverter } from '../components/BlockConverter'

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
                    components: {
                        input: BlockWithConverter,
                    },
                    fields: [
                        defineField({ name: 'title', type: 'string', title: 'Title' }),
                        defineField({ name: 'subtitle', type: 'string', title: 'Subtitle (Role/Tools)' }),
                        defineField({ name: 'intro', type: 'text', title: 'Introduction' }),
                        defineField({ name: 'image', type: 'image', title: 'Cover Image', options: { hotspot: true } }),
                    ],
                    preview: {
                        select: {
                            title: 'title',
                            media: 'image',
                        },
                        prepare({ title, media }) {
                            return {
                                title: `🦸 Hero${title ? `: ${title}` : ''}`,
                                media,
                            }
                        },
                    },
                }),
                // Metadata Block
                defineField({
                    name: 'metadata',
                    title: 'Metadata',
                    type: 'object',
                    components: {
                        input: BlockWithConverter,
                    },
                    fields: [
                        defineField({ name: 'role', type: 'string', title: 'Role' }),
                        defineField({ name: 'client', type: 'string', title: 'Client' }),
                        defineField({ name: 'year', type: 'string', title: 'Year' }),
                    ],
                    preview: {
                        select: {
                            role: 'role',
                            client: 'client',
                        },
                        prepare({ role, client }) {
                            const subtitle = [role, client].filter(Boolean).join(' • ')
                            return {
                                title: '📋 Metadata',
                                subtitle: subtitle || undefined,
                            }
                        },
                    },
                }),
                // Split Media Block
                defineField({
                    name: 'splitMedia',
                    title: 'Split Media',
                    type: 'object',
                    components: {
                        input: BlockWithConverter,
                    },
                    fields: [
                        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
                        defineField({ name: 'text', type: 'text', title: 'Text' }),
                        defineField({ name: 'image', type: 'image', title: 'Single Image', options: { hotspot: true }, description: 'Use this for a single image, or use Images below for multiple' }),
                        defineField({
                            name: 'images',
                            title: 'Multiple Images',
                            description: 'Add multiple images to display side by side. If populated, this overrides Single Image.',
                            type: 'array',
                            of: [{ type: 'image', options: { hotspot: true } }],
                        }),
                        defineField({ name: 'reverseLayout', type: 'boolean', title: 'Reverse Layout (Image/Images on Left)', initialValue: false }),
                    ],
                    preview: {
                        select: {
                            headline: 'headline',
                            media: 'image',
                            images: 'images',
                        },
                        prepare({ headline, media, images }) {
                            const imageCount = images?.length || (media ? 1 : 0)
                            return {
                                title: `↔️ Split Media${headline ? `: ${headline}` : ''}`,
                                subtitle: imageCount > 1 ? `${imageCount} images` : undefined,
                                media: images?.[0] || media,
                            }
                        },
                    },
                }),
                // Media Grid Block
                defineField({
                    name: 'mediaGrid',
                    title: 'Media Grid',
                    type: 'object',
                    components: {
                        input: BlockWithConverter,
                    },
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
                    preview: {
                        select: {
                            headline: 'headline',
                            images: 'images',
                        },
                        prepare({ headline, images }) {
                            const count = images?.length || 0
                            return {
                                title: `🔲 Media Grid${headline ? `: ${headline}` : ''}`,
                                subtitle: `${count} image${count !== 1 ? 's' : ''}`,
                                media: images?.[0],
                            }
                        },
                    },
                }),
                // Full Width Media Block
                defineField({
                    name: 'fullWidthMedia',
                    title: 'Full Width Media',
                    type: 'object',
                    components: {
                        input: BlockWithConverter,
                    },
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
                    preview: {
                        select: {
                            headline: 'headline',
                            mediaType: 'mediaType',
                            image: 'image',
                        },
                        prepare({ headline, mediaType, image }) {
                            const type = mediaType === 'video' ? 'Video' : 'Image'
                            return {
                                title: `🖼️ Full Width ${type}${headline ? `: ${headline}` : ''}`,
                                media: image,
                            }
                        },
                    },
                }),
                // Carousel Block
                defineField({
                    name: 'carousel',
                    title: 'Carousel Gallery',
                    type: 'object',
                    components: {
                        input: BlockWithConverter,
                    },
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
                    preview: {
                        select: {
                            headline: 'headline',
                            slides: 'slides',
                        },
                        prepare({ headline, slides }) {
                            const count = slides?.length || 0
                            return {
                                title: `🎠 Carousel${headline ? `: ${headline}` : ''}`,
                                subtitle: `${count} slide${count !== 1 ? 's' : ''}`,
                                media: slides?.[0]?.image,
                            }
                        },
                    },
                }),
                // Accordion Block
                defineField({
                    name: 'accordion',
                    title: 'Accordion',
                    type: 'object',
                    components: {
                        input: BlockWithConverter,
                    },
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
                    preview: {
                        select: {
                            headline: 'headline',
                            items: 'items',
                        },
                        prepare({ headline, items }) {
                            const count = items?.length || 0
                            return {
                                title: `📁 Accordion${headline ? `: ${headline}` : ''}`,
                                subtitle: `${count} item${count !== 1 ? 's' : ''}`,
                            }
                        },
                    },
                }),
                // Content Cards Block
                defineField({
                    name: 'contentCards',
                    title: 'Content Cards',
                    type: 'object',
                    components: {
                        input: BlockWithConverter,
                    },
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
                    preview: {
                        select: {
                            headline: 'headline',
                            cards: 'cards',
                        },
                        prepare({ headline, cards }) {
                            const count = cards?.length || 0
                            return {
                                title: `🃏 Content Cards${headline ? `: ${headline}` : ''}`,
                                subtitle: `${count} card${count !== 1 ? 's' : ''}`,
                            }
                        },
                    },
                }),
                // Background Video Block
                defineField({
                    name: 'backgroundVideo',
                    title: 'Background Video',
                    type: 'object',
                    components: {
                        input: BlockWithConverter,
                    },
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
                    preview: {
                        select: {
                            heading: 'heading',
                        },
                        prepare({ heading }) {
                            return {
                                title: `🎬 Background Video${heading ? `: ${heading}` : ''}`,
                            }
                        },
                    },
                }),
                // Comparison Block
                defineField({
                    name: 'comparison',
                    title: 'Comparison',
                    type: 'object',
                    components: {
                        input: BlockWithConverter,
                    },
                    fields: [
                        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
                        defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
                        defineField({ name: 'leftImage', type: 'image', title: 'Left Image', options: { hotspot: true } }),
                        defineField({ name: 'leftLabel', type: 'string', title: 'Left Label' }),
                        defineField({ name: 'rightImage', type: 'image', title: 'Right Image', options: { hotspot: true } }),
                        defineField({ name: 'rightLabel', type: 'string', title: 'Right Label' }),
                    ],
                    preview: {
                        select: {
                            headline: 'headline',
                            leftImage: 'leftImage',
                        },
                        prepare({ headline, leftImage }) {
                            return {
                                title: `⚖️ Comparison${headline ? `: ${headline}` : ''}`,
                                media: leftImage,
                            }
                        },
                    },
                }),
                // Side by Side Images Block
                defineField({
                    name: 'sideBySideImages',
                    title: 'Side by Side Images',
                    type: 'object',
                    components: {
                        input: BlockWithConverter,
                    },
                    fields: [
                        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
                        defineField({ name: 'leftImage', type: 'image', title: 'Left Image', options: { hotspot: true } }),
                        defineField({ name: 'leftLabel', type: 'string', title: 'Left Label (optional)' }),
                        defineField({ name: 'rightImage', type: 'image', title: 'Right Image', options: { hotspot: true } }),
                        defineField({ name: 'rightLabel', type: 'string', title: 'Right Label (optional)' }),
                        defineField({
                            name: 'background',
                            title: 'Background',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Gray', value: 'gray' },
                                    { title: 'White', value: 'white' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'gray',
                        }),
                    ],
                    preview: {
                        select: {
                            headline: 'headline',
                            leftImage: 'leftImage',
                            leftLabel: 'leftLabel',
                            rightLabel: 'rightLabel',
                        },
                        prepare({ headline, leftImage, leftLabel, rightLabel }) {
                            const labels = [leftLabel, rightLabel].filter(Boolean).join(' / ')
                            return {
                                title: `👯 Side by Side${headline ? `: ${headline}` : ''}`,
                                subtitle: labels || undefined,
                                media: leftImage,
                            }
                        },
                    },
                }),
                // Annotated Image Block (with hotspots)
                defineField({
                    name: 'annotatedImage',
                    title: 'Annotated Image',
                    type: 'object',
                    components: {
                        input: HotspotImageInput,
                    },
                    fields: [
                        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
                        defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
                        defineField({
                            name: 'image',
                            type: 'image',
                            title: 'Image',
                            options: { hotspot: true },
                        }),
                        defineField({
                            name: 'hotspots',
                            title: 'Hotspots',
                            type: 'array',
                            of: [{
                                type: 'object',
                                name: 'hotspot',
                                fields: [
                                    defineField({ name: 'x', type: 'number', title: 'X Position (%)' }),
                                    defineField({ name: 'y', type: 'number', title: 'Y Position (%)' }),
                                    defineField({ name: 'title', type: 'string', title: 'Title' }),
                                    defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
                                    defineField({
                                        name: 'type',
                                        type: 'string',
                                        title: 'Type',
                                        options: {
                                            list: [
                                                { title: 'Problem', value: 'problem' },
                                                { title: 'Improvement', value: 'improvement' },
                                                { title: 'Neutral', value: 'neutral' },
                                            ],
                                        },
                                        initialValue: 'neutral',
                                    }),
                                ],
                                preview: {
                                    select: {
                                        title: 'title',
                                        type: 'type',
                                    },
                                    prepare({ title, type }) {
                                        const typeEmoji = type === 'problem' ? '🔴' : type === 'improvement' ? '🟢' : '🔵'
                                        return {
                                            title: `${typeEmoji} ${title || 'Untitled hotspot'}`,
                                        }
                                    },
                                },
                            }],
                        }),
                        defineField({
                            name: 'showLegend',
                            type: 'boolean',
                            title: 'Show Legend Below Image',
                            description: 'Display all hotspots as a numbered list below the image',
                            initialValue: true,
                        }),
                    ],
                    preview: {
                        select: {
                            headline: 'headline',
                            hotspots: 'hotspots',
                            media: 'image',
                        },
                        prepare({ headline, hotspots, media }) {
                            const count = hotspots?.length || 0
                            return {
                                title: `📍 Annotated Image${headline ? `: ${headline}` : ''}`,
                                subtitle: `${count} hotspot${count !== 1 ? 's' : ''}`,
                                media,
                            }
                        },
                    },
                }),
            ],
        }),
    ],
})
