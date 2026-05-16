import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'quoteBlock',
    title: 'Quote Block',
    type: 'object',
    fields: [
        defineField({
            name: 'quote',
            title: 'Quote Text',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
        }),
        defineField({
            name: 'role',
            title: 'Author Role',
            type: 'string',
        }),
    ],
    preview: {
        select: {
            title: 'quote',
            subtitle: 'author',
        },
        prepare(selection) {
            return {
                title: selection.title && selection.title.substring(0, 50) + '...',
                subtitle: selection.subtitle || 'Quote Block',
            }
        },
    },
})
