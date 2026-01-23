import { defineField, defineType } from 'sanity'

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
            description: 'Upload images here first, then assign them to blocks below',
            type: 'array',
            of: [{
                type: 'image',
                options: { hotspot: true },
                fields: [
                    {
                        name: 'caption',
                        type: 'string',
                        title: 'Caption',
                    },
                    {
                        name: 'alt',
                        type: 'string',
                        title: 'Alt text',
                    }
                ]
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
                        defineField({ name: 'image', type: 'image', title: 'Image', options: { hotspot: true } }),
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
                            name: 'images',
                            title: 'Images',
                            type: 'array',
                            of: [{ type: 'image', options: { hotspot: true } }],
                            validation: Rule => Rule.required().min(2),
                        }),
                        defineField({
                            name: 'layout',
                            title: 'Layout Style',
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Full Width', value: 'full' },
                                    { title: 'Contained', value: 'contained' },
                                ],
                                layout: 'radio',
                            },
                            initialValue: 'full',
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
                            type: 'file',
                            title: 'Video File',
                            options: {
                                accept: 'video/*'
                            }
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
            ],
        }),
    ],
})
