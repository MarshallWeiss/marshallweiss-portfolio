import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'currentlyReading',
  title: 'Currently Reading',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Book Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'What you\'re learning or thinking about',
    }),
    defineField({
      name: 'cover',
      title: 'Book Cover',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Reading', value: 'reading' },
          { title: 'Want to Read', value: 'want-to-read' },
          { title: 'Finished', value: 'finished' },
        ],
        layout: 'radio',
      },
      initialValue: 'reading',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startedAt',
      title: 'Started Reading',
      type: 'date',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author',
      media: 'cover',
      status: 'status',
    },
    prepare({ title, author, media, status }) {
      return {
        title: title,
        subtitle: `${author} • ${status}`,
        media: media,
      };
    },
  },
});
