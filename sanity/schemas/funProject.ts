import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'funProject',
  title: 'Fun Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'What it is',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Technologies, categories (e.g., AI, Music, Design)',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Idea', value: 'idea' },
          { title: 'Completed', value: 'completed' },
          { title: 'Paused', value: 'paused' },
        ],
        layout: 'radio',
      },
      initialValue: 'in-progress',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Optional image for the project',
    }),
    defineField({
      name: 'url',
      title: 'Project URL',
      type: 'url',
      description: 'Link to project, repo, or demo',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'datetime',
      description: 'When you last worked on this',
    }),
  ],
  orderings: [
    {
      title: 'Recently Updated',
      name: 'updatedAtDesc',
      by: [{ field: 'updatedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      tags: 'tags',
    },
    prepare({ title, status, tags }) {
      return {
        title: title,
        subtitle: `${status}${tags && tags.length > 0 ? ` • ${tags.join(', ')}` : ''}`,
      };
    },
  },
});
