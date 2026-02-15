import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'doingItem',
  title: 'Doing Items',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g. "Singing lessons" (emoji optional)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Paused', value: 'paused' },
          { title: 'Done', value: 'done' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: '1 = shown first',
      validation: (Rule) => Rule.required().min(1).max(10),
      initialValue: 5,
    }),
  ],
  orderings: [
    {
      title: 'Priority',
      name: 'priorityAsc',
      by: [{ field: 'priority', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      priority: 'priority',
    },
    prepare({ title, status, priority }) {
      return {
        title: title,
        subtitle: `P${priority} - ${status}`,
      };
    },
  },
});
