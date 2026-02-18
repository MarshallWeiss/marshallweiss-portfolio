import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'curatedArticle',
  title: 'Curated Articles',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'e.g. "The Atlantic", "Stratechery", "Paul Graham"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Brief note on why this is worth reading',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image URL',
      type: 'url',
      description: 'Open Graph image URL auto-fetched from the article',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AI', value: 'AI' },
          { title: 'Design', value: 'Design' },
          { title: 'Philosophy', value: 'Philosophy' },
          { title: 'Technology', value: 'Technology' },
          { title: 'Culture', value: 'Culture' },
          { title: 'Product', value: 'Product' },
        ],
      },
    }),
    defineField({
      name: 'addedAt',
      title: 'Date Added',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'addedAtDesc',
      by: [{ field: 'addedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      source: 'source',
      category: 'category',
    },
    prepare({ title, source, category }) {
      return {
        title,
        subtitle: [source, category].filter(Boolean).join(' - '),
      };
    },
  },
});
