import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'projectsGridBlock',
    title: 'Projects Grid Block',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'limit',
            title: 'Limit (0 = all)',
            type: 'number',
            initialValue: 6,
        }),
        defineField({
            name: 'filterByTag',
            title: 'Filter by Tag',
            type: 'reference',
            to: [{ type: 'tag' }],
        }),
        defineField({
            name: 'featured',
            title: 'Show Only Featured',
            type: 'boolean',
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare(selection) {
            return {
                title: selection.title || 'Projects Grid Block',
            }
        },
    },
})
