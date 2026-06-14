import { defineField, defineType } from 'sanity'
import { MultipleImageInput } from '../components/MultipleImageInput'
import { ImagePreview } from '../components/ImagePreview'
import { HotspotImageInput } from '../components/HotspotImageInput'
import { BlockWithConverter } from '../components/BlockConverter'
import { ImageWithMetadata } from '../components/ImageWithMetadata'
import {
    layoutFields,
    typographyFields,
    headingFields,
    mediaItemFields,
    aspectRatioField,
    objectFitField,
    imageStyleFields,
    videoControlFields,
} from './shared-fields'

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
            name: 'subtitle',
            title: 'Card Subtitle',
            type: 'string',
            description: 'One-line description shown on the case studies listing page',
        }),
        defineField({
            name: 'thumbnailType',
            title: 'Thumbnail Type',
            description: 'Choose between image or video for the case studies listing page thumbnail',
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
            name: 'thumbnailImage',
            title: 'Thumbnail Image',
            description: 'Optional: Custom thumbnail for the case studies listing page. If not set, will use the hero image.',
            type: 'image',
            options: {
                hotspot: true,
            },
            components: {
                input: ImageWithMetadata,
            },
            hidden: ({ document }) => document?.thumbnailType === 'video',
        }),
        defineField({
            name: 'thumbnailVideo',
            title: 'Thumbnail Video',
            description: 'Video thumbnail for the case studies listing page. Will autoplay, loop, and be muted.',
            type: 'mux.video',
            hidden: ({ document }) => document?.thumbnailType !== 'video',
        }),
        defineField({
            name: 'images',
            title: 'Case Study Images',
            description: 'Upload all images used in this case study. These images can be referenced in blocks below.',
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
                        defineField({
                            name: 'image',
                            type: 'image',
                            title: 'Cover Image',
                            options: { hotspot: true },
                            components: {
                                input: ImageWithMetadata,
                            },
                        }),
                        defineField({
                            name: 'showImage',
                            type: 'boolean',
                            title: 'Show Cover Image',
                            description: 'Uncheck to hide the cover image and use the next block as the visual instead.',
                            initialValue: true,
                        }),
                        defineField({ name: 'role', type: 'string', title: 'Role' }),
                        defineField({ name: 'client', type: 'string', title: 'Client' }),
                        defineField({ name: 'year', type: 'string', title: 'Year' }),
                        aspectRatioField,
                        objectFitField,
                        ...imageStyleFields,
                        ...layoutFields,
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
                // Split Media Block (Text and Media)
                defineField({
                    name: 'splitMedia',
                    title: 'Text and Media',
                    type: 'object',
                    components: {
                        input: BlockWithConverter,
                    },
                    fields: [
                        ...headingFields,
                        defineField({ name: 'text', type: 'text', title: 'Text', rows: 6 }),
                        ...typographyFields,
                        defineField({
                            name: 'layout',
                            title: 'Layout',
                            description: 'How to arrange text and media.',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Side by Side', value: 'sideBySide' },
                                    { title: 'Text Above, Media Below', value: 'textAbove' },
                                    { title: 'Media Above, Text Below', value: 'mediaAbove' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'sideBySide',
                        }),
                        defineField({
                            name: 'mediaType',
                            title: 'Media Type',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Single Image', value: 'image' },
                                    { title: 'Multiple Images', value: 'images' },
                                    { title: 'Video', value: 'video' },
                                    { title: 'Figma Prototype', value: 'figma' },
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
                            hidden: ({ parent }) => parent?.mediaType !== 'image',
                            components: {
                                input: ImageWithMetadata,
                            },
                        }),
                        defineField({
                            name: 'images',
                            title: 'Images',
                            description: 'Add multiple images to display side by side. Each image can have its own aspect ratio.',
                            type: 'array',
                            of: [{
                                type: 'object',
                                name: 'imageWithAspectRatio',
                                fields: [
                                    defineField({
                                        name: 'image',
                                        type: 'image',
                                        title: 'Image',
                                        options: { hotspot: true },
                                    }),
                                    defineField({
                                        name: 'aspectRatio',
                                        title: 'Aspect Ratio',
                                        description: 'Override the default aspect ratio for this specific image',
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
                                    }),
                                ],
                                preview: {
                                    select: {
                                        media: 'image',
                                        aspectRatio: 'aspectRatio',
                                    },
                                    prepare({ media, aspectRatio }) {
                                        return {
                                            title: aspectRatio ? `${aspectRatio}` : 'Auto',
                                            media,
                                        }
                                    },
                                },
                            }],
                            hidden: ({ parent }) => parent?.mediaType !== 'images',
                        }),
                        defineField({
                            name: 'video',
                            type: 'mux.video',
                            title: 'Video',
                            hidden: ({ parent }) => parent?.mediaType !== 'video',
                        }),
                        ...videoControlFields.map(field => ({
                            ...field,
                            hidden: ({ parent }: any) => parent?.mediaType !== 'video',
                        })),
                        defineField({
                            name: 'figmaUrl',
                            type: 'url',
                            title: 'Figma Prototype URL',
                            description: 'Paste the Figma prototype embed URL here. In Figma: Share → "Get embed code" → copy the URL from the iframe src.',
                            hidden: ({ parent }) => parent?.mediaType !== 'figma',
                            validation: Rule => Rule.uri({
                                scheme: ['https']
                            })
                        }),
                        aspectRatioField,
                        objectFitField,
                        defineField({
                            name: 'imageHeight',
                            title: 'Image Height',
                            description: 'Set a fixed height for multiple images to ensure they match. Only applies when using multiple images.',
                            type: 'number',
                            initialValue: 600,
                            validation: Rule => Rule.min(200).max(1200),
                            hidden: ({ parent }) => parent?.mediaType !== 'images',
                        }),
                        defineField({
                            name: 'reverseLayout',
                            type: 'boolean',
                            title: 'Reverse Layout (Media on Left)',
                            description: 'Only applies to side-by-side layout.',
                            initialValue: false,
                            hidden: ({ parent }) => parent?.layout !== 'sideBySide',
                        }),
                        defineField({
                            name: 'mediaRatio',
                            title: 'Media/Text Width Ratio',
                            description: 'Control how much space the media takes vs. text. Only applies to side-by-side layout.',
                            type: 'string',
                            options: {
                                list: [
                                    { title: '40/60 - Text Larger', value: '40/60' },
                                    { title: '50/50 - Balanced', value: '50/50' },
                                    { title: '60/40 - Media Larger', value: '60/40' },
                                    { title: '70/30 - Media Dominant', value: '70/30' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: '50/50',
                            hidden: ({ parent }) => parent?.layout !== 'sideBySide',
                        }),
                        defineField({
                            name: 'textPadding',
                            title: 'Text Padding',
                            description: 'Add extra padding around the text content.',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'None', value: 'none' },
                                    { title: 'Small', value: 'small' },
                                    { title: 'Medium', value: 'medium' },
                                    { title: 'Large', value: 'large' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'none',
                        }),
                        ...imageStyleFields,
                        ...layoutFields,
                    ],
                    preview: {
                        select: {
                            headline: 'headline',
                            media: 'image',
                            images: 'images',
                            layout: 'layout',
                        },
                        prepare({ headline, media, images, layout }) {
                            const imageCount = images?.length || (media ? 1 : 0)
                            const layoutIcons: Record<string, string> = {
                                sideBySide: '↔️',
                                textAbove: '⬇️',
                                mediaAbove: '⬆️',
                            }
                            const layoutNames: Record<string, string> = {
                                sideBySide: 'Side by Side',
                                textAbove: 'Text Above',
                                mediaAbove: 'Media Above',
                            }
                            const icon = layoutIcons[layout || 'sideBySide'] || '↔️'
                            const layoutName = layoutNames[layout || 'sideBySide'] || 'Side by Side'
                            // Handle new structure where images is array of { image, aspectRatio }
                            const previewImage = images?.[0]?.image || images?.[0] || media
                            return {
                                title: `${icon} Text & Media${headline ? `: ${headline}` : ''}`,
                                subtitle: `${layoutName}${imageCount > 1 ? ` • ${imageCount} images` : ''}`,
                                media: previewImage,
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
                        ...headingFields,
                        defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
                        ...typographyFields,
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
                        aspectRatioField,
                        objectFitField,
                        defineField({
                            name: 'imageShadow',
                            title: 'Image Shadow',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'None', value: 'none' },
                                    { title: 'Small', value: 'small' },
                                    { title: 'Medium', value: 'medium' },
                                    { title: 'Large', value: 'large' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'none',
                        }),
                        ...layoutFields,
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
                        ...headingFields,
                        defineField({
                            name: 'mediaType',
                            title: 'Media Type',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Image', value: 'image' },
                                    { title: 'Video', value: 'video' },
                                    { title: 'Figma Prototype', value: 'figma' },
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
                            hidden: ({ parent }) => parent?.mediaType !== 'image',
                            components: {
                                input: ImageWithMetadata,
                            },
                        }),
                        defineField({
                            name: 'video',
                            type: 'mux.video',
                            title: 'Video',
                            hidden: ({ parent }) => parent?.mediaType !== 'video',
                        }),
                        ...videoControlFields.map(field => ({
                            ...field,
                            hidden: ({ parent }: any) => parent?.mediaType !== 'video',
                        })),
                        aspectRatioField,
                        objectFitField,
                        defineField({ name: 'caption', type: 'string', title: 'Caption' }),
                        ...imageStyleFields,
                        ...layoutFields,
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
                        ...headingFields,
                        ...typographyFields,
                        defineField({
                            name: 'headingSpacing',
                            title: 'Heading to Carousel Spacing',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Tight', value: 'tight' },
                                    { title: 'Compact', value: 'compact' },
                                    { title: 'Default', value: 'default' },
                                    { title: 'Spacious', value: 'spacious' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'default',
                        }),
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
                        defineField({
                            name: 'slidesPerView',
                            title: 'Slides Per View',
                            description: 'How many slides to show at once. Use 1 for large lightbox-style display.',
                            type: 'string',
                            options: {
                                list: [
                                    { title: '1 (Lightbox Style - Largest)', value: '1' },
                                    { title: '2 (Large)', value: '2' },
                                    { title: '3 (Medium)', value: '3' },
                                    { title: '4 (Compact)', value: '4' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: '2',
                        }),
                        defineField({
                            name: 'slideLayout',
                            title: 'Slide Layout',
                            description: 'How image and text are arranged inside each slide. "Text Left, Image Right" suits vertical images and works best with 1 slide per view.',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Image Above, Text Below (default)', value: 'imageTop' },
                                    { title: 'Text Left, Image Right', value: 'textRight' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'imageTop',
                        }),
                        defineField({
                            name: 'verticalAlign',
                            title: 'Vertical Alignment',
                            description: 'Align images to top, center, or bottom of the carousel container.',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Top', value: 'top' },
                                    { title: 'Center', value: 'center' },
                                    { title: 'Bottom', value: 'bottom' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'center',
                        }),
                        defineField({
                            name: 'arrowPosition',
                            title: 'Arrow Position',
                            description: 'Place arrows overlapping images or outside (outside works best with contained/wide widths).',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Overlapping Images', value: 'overlapping' },
                                    { title: 'Outside Images', value: 'outside' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'overlapping',
                        }),
                        defineField({
                            name: 'infiniteLoop',
                            title: 'Infinite Loop',
                            description: 'Enable continuous scrolling - arrows loop back to start/end instead of disabling.',
                            type: 'boolean',
                            initialValue: false,
                        }),
                        defineField({
                            name: 'showBackground',
                            title: 'Show Image Background',
                            description: 'Display gray background behind images. Disable for transparent/dynamic height images.',
                            type: 'boolean',
                            initialValue: true,
                        }),
                        aspectRatioField,
                        objectFitField,
                        defineField({
                            name: 'imageShadow',
                            title: 'Image Shadow',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'None', value: 'none' },
                                    { title: 'Small', value: 'small' },
                                    { title: 'Medium', value: 'medium' },
                                    { title: 'Large', value: 'large' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'none',
                        }),
                        ...layoutFields,
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
                        ...headingFields,
                        ...typographyFields,
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
                        ...layoutFields,
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
                        ...headingFields,
                        defineField({ name: 'description', type: 'text', title: 'Description (optional)' }),
                        ...typographyFields,
                        defineField({
                            name: 'headingSpacing',
                            title: 'Heading to Cards Spacing',
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
                            name: 'revealOnClick',
                            title: 'Reveal on Click',
                            description: 'Hide card content until clicked. Great for Q&A, tips, or interactive reveals!',
                            type: 'boolean',
                            initialValue: false,
                        }),
                        defineField({
                            name: 'revealHint',
                            title: 'Reveal Hint Text',
                            description: 'Text to show on cards before they\'re clicked (e.g., "Click to reveal", "Tap for answer")',
                            type: 'string',
                            initialValue: '👆 Click to reveal',
                            hidden: ({ parent }) => !parent?.revealOnClick,
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
                        ...layoutFields,
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
                        ...headingFields,
                        defineField({ name: 'text', type: 'text', title: 'Text' }),
                        ...typographyFields,
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
                        aspectRatioField,
                        ...layoutFields,
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
                        ...headingFields,
                        defineField({ name: 'description', type: 'text', title: 'Description', rows: 3 }),
                        ...typographyFields,
                        defineField({
                            name: 'leftImage',
                            type: 'image',
                            title: 'Left Image',
                            options: { hotspot: true },
                            components: {
                                input: ImageWithMetadata,
                            },
                        }),
                        defineField({ name: 'leftLabel', type: 'string', title: 'Left Label' }),
                        defineField({
                            name: 'rightImage',
                            type: 'image',
                            title: 'Right Image',
                            options: { hotspot: true },
                            components: {
                                input: ImageWithMetadata,
                            },
                        }),
                        defineField({ name: 'rightLabel', type: 'string', title: 'Right Label' }),
                        defineField({
                            name: 'labelSize',
                            title: 'Label Size',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Small', value: 'small' },
                                    { title: 'Medium', value: 'medium' },
                                    { title: 'Large', value: 'large' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'small',
                        }),
                        aspectRatioField,
                        objectFitField,
                        ...layoutFields,
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
                        ...headingFields,
                        ...typographyFields,
                        defineField({
                            name: 'leftImage',
                            type: 'image',
                            title: 'Left Image',
                            options: { hotspot: true },
                            components: {
                                input: ImageWithMetadata,
                            },
                        }),
                        defineField({ name: 'leftLabel', type: 'string', title: 'Left Label (optional)' }),
                        defineField({
                            name: 'rightImage',
                            type: 'image',
                            title: 'Right Image',
                            options: { hotspot: true },
                            components: {
                                input: ImageWithMetadata,
                            },
                        }),
                        defineField({ name: 'rightLabel', type: 'string', title: 'Right Label (optional)' }),
                        defineField({
                            name: 'labelSize',
                            title: 'Label Size',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Small', value: 'small' },
                                    { title: 'Medium', value: 'medium' },
                                    { title: 'Large', value: 'large' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'small',
                        }),
                        aspectRatioField,
                        objectFitField,
                        ...layoutFields,
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
                // Text Block
                defineField({
                    name: 'textBlock',
                    title: 'Text Block',
                    type: 'object',
                    components: {
                        input: BlockWithConverter,
                    },
                    fields: [
                        ...headingFields,
                        defineField({ name: 'text', type: 'text', title: 'Text', rows: 6 }),
                        defineField({
                            name: 'textSize',
                            title: 'Text Size',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Small', value: 'small' },
                                    { title: 'Medium', value: 'medium' },
                                    { title: 'Large', value: 'large' },
                                    { title: 'Extra Large', value: 'xlarge' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'medium',
                        }),
                        defineField({
                            name: 'alignment',
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
                            initialValue: 'center',
                        }),
                        defineField({
                            name: 'maxWidth',
                            title: 'Max Width',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Narrow (prose)', value: 'narrow' },
                                    { title: 'Medium', value: 'medium' },
                                    { title: 'Wide', value: 'wide' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'medium',
                        }),
                        ...layoutFields,
                        defineField({
                            name: 'paddingTop',
                            title: 'Padding Top',
                            description: 'Override top padding independently (useful when this block serves as a title for the block below)',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'None', value: 'none' },
                                    { title: 'Compact', value: 'compact' },
                                    { title: 'Default', value: 'default' },
                                    { title: 'Spacious', value: 'spacious' },
                                ],
                                layout: 'radio',
                            },
                        }),
                        defineField({
                            name: 'paddingBottom',
                            title: 'Padding Bottom',
                            description: 'Override bottom padding independently',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'None', value: 'none' },
                                    { title: 'Compact', value: 'compact' },
                                    { title: 'Default', value: 'default' },
                                    { title: 'Spacious', value: 'spacious' },
                                ],
                                layout: 'radio',
                            },
                        }),
                    ],
                    preview: {
                        select: {
                            headline: 'headline',
                            text: 'text',
                            alignment: 'alignment',
                        },
                        prepare({ headline, text, alignment }) {
                            const alignEmoji = alignment === 'center' ? '⊡' : alignment === 'left' ? '⊣' : '⊢'
                            const preview = text ? text.substring(0, 60) + (text.length > 60 ? '...' : '') : ''
                            return {
                                title: `${alignEmoji} Text${headline ? `: ${headline}` : ''}`,
                                subtitle: preview,
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
                        ...headingFields,
                        defineField({ name: 'description', type: 'text', title: 'Description', rows: 2 }),
                        ...typographyFields,
                        defineField({
                            name: 'image',
                            type: 'image',
                            title: 'Image',
                            options: { hotspot: true },
                            components: {
                                input: ImageWithMetadata,
                            },
                        }),
                        defineField({
                            name: 'layout',
                            title: 'Layout',
                            type: 'string',
                            description: 'Overlay: full-width image with tooltips. Side by Side: text on one side, annotated image on the other.',
                            options: {
                                list: [
                                    { title: 'Overlay', value: 'overlay' },
                                    { title: 'Side by Side', value: 'sideBySide' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'overlay',
                        }),
                        defineField({
                            name: 'reverseLayout',
                            type: 'boolean',
                            title: 'Image on Left',
                            description: 'Put the image on the left and text on the right (default is text left, image right)',
                            initialValue: false,
                            hidden: ({ parent }) => parent?.layout !== 'sideBySide',
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
                            title: 'Show Annotations',
                            description: 'Show annotation cards (legend below in Overlay, sidebar in Stack layouts). When off, only tooltips on hover are shown.',
                            initialValue: true,
                        }),
                        aspectRatioField,
                        objectFitField,
                        ...layoutFields,
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
                // Divider
                defineField({
                    name: 'divider',
                    title: 'Divider',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'style',
                            title: 'Style',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Line', value: 'line' },
                                    { title: 'Dots', value: 'dots' },
                                    { title: 'Space Only', value: 'space' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'line',
                        }),
                        defineField({
                            name: 'width',
                            title: 'Width',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Narrow', value: 'narrow' },
                                    { title: 'Medium', value: 'medium' },
                                    { title: 'Wide', value: 'wide' },
                                    { title: 'Full', value: 'full' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'medium',
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
                        defineField({
                            name: 'color',
                            title: 'Color',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Light', value: 'light' },
                                    { title: 'Medium', value: 'medium' },
                                    { title: 'Dark', value: 'dark' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'light',
                            hidden: ({ parent }) => parent?.style === 'space',
                        }),
                    ],
                    preview: {
                        select: {
                            style: 'style',
                        },
                        prepare({ style }) {
                            const styleLabel = style === 'dots' ? 'Dots' : style === 'space' ? 'Space' : 'Line'
                            return {
                                title: `── Divider (${styleLabel})`,
                            }
                        },
                    },
                }),
                // Animated Diagram Block (coded, on-brand concept animations)
                defineField({
                    name: 'animatedDiagram',
                    title: 'Animated Diagram',
                    type: 'object',
                    components: {
                        input: BlockWithConverter,
                    },
                    fields: [
                        defineField({
                            name: 'variant',
                            title: 'Diagram',
                            description: 'Which coded animation to render.',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Sections → Topics', value: 'sectionsToTopics' },
                                    { title: 'Modular Template System', value: 'templateMorph' },
                                    { title: 'Balancing Competing Needs', value: 'competingNeeds' },
                                    { title: 'Home Page Architecture', value: 'homepageArchitecture' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'sectionsToTopics',
                        }),
                        ...headingFields,
                        defineField({ name: 'text', type: 'text', title: 'Text', rows: 6 }),
                        ...typographyFields,
                        defineField({
                            name: 'layout',
                            title: 'Layout',
                            description: 'How to arrange the copy and the diagram.',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Side by Side', value: 'sideBySide' },
                                    { title: 'Full Width', value: 'fullWidth' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'sideBySide',
                        }),
                        defineField({
                            name: 'reverseLayout',
                            title: 'Reverse Layout',
                            description: 'Put the diagram on the left and the text on the right.',
                            type: 'boolean',
                            initialValue: false,
                            hidden: ({ parent }) => parent?.layout !== 'sideBySide',
                        }),
                        defineField({
                            name: 'mediaRatio',
                            title: 'Diagram / Text Ratio',
                            type: 'string',
                            options: {
                                list: [
                                    { title: '40 / 60', value: '40/60' },
                                    { title: '50 / 50', value: '50/50' },
                                    { title: '60 / 40', value: '60/40' },
                                    { title: '70 / 30', value: '70/30' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: '50/50',
                            hidden: ({ parent }) => parent?.layout !== 'sideBySide',
                        }),
                        ...layoutFields,
                    ],
                    preview: {
                        select: {
                            headline: 'headline',
                            variant: 'variant',
                        },
                        prepare({ headline, variant }) {
                            return {
                                title: `✦ Animated Diagram${headline ? `: ${headline}` : ''}`,
                                subtitle: variant,
                            }
                        },
                    },
                }),
            ],
        }),
    ],
})
