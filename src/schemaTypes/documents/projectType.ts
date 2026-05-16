import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'projectType',
    title: 'Project Type',
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
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2,
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
