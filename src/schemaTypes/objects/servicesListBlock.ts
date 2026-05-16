import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'servicesListBlock',
    title: 'Services List Block',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'services',
            title: 'Services',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'service' }],
                },
            ],
        }),
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare(selection) {
            return {
                title: selection.title || 'Services List Block',
            }
        },
    },
})
