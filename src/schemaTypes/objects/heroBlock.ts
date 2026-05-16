import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'heroBlock',
    title: 'Hero Block',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subheading',
            title: 'Subheading',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'media',
            title: 'Media (Image or Video)',
            type: 'object',
            fields: [
                {
                    name: 'type',
                    type: 'string',
                    options: { list: ['image', 'video'] },
                },
                {
                    name: 'asset',
                    type: 'image',
                },
            ],
        }),
        defineField({
            name: 'cta',
            title: 'Call to Action',
            type: 'link',
        }),
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare(selection) {
            return {
                title: 'Hero Block: ' + selection.title,
            }
        },
    },
})
