import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'workProject',
  title: 'Work Projects',
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
      description: 'What you\'re working on',
    }),
    defineField({
      name: 'company',
      title: 'Company/Client',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'In Progress', value: 'in-progress' },
          { title: 'Planned', value: 'planned' },
          { title: 'Completed', value: 'completed' },
          { title: 'On Hold', value: 'on-hold' },
        ],
        layout: 'radio',
      },
      initialValue: 'in-progress',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: '1 = highest priority, 5 = lowest',
      validation: (Rule) => Rule.required().min(1).max(5),
      initialValue: 3,
    }),
    defineField({
      name: 'confidential',
      title: 'Confidential',
      type: 'boolean',
      description: 'Blur project details and show cursor tooltip on hover',
      initialValue: true,
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
    }),
  ],
  orderings: [
    {
      title: 'Priority (1 = highest)',
      name: 'priorityAsc',
      by: [{ field: 'priority', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      company: 'company',
      status: 'status',
      priority: 'priority',
    },
    prepare({ title, company, status, priority }) {
      return {
        title: title,
        subtitle: `${company || 'No company'} • P${priority} • ${status}`,
      };
    },
  },
});
