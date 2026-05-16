import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'tag',
    title: 'Tag',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare(selection) {
            return {
                title: selection.title,
            }
        },
    },
})
