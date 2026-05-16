import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'statsBlock',
    title: 'Stats Block',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'stats',
            title: 'Statistics',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'value', type: 'string', title: 'Value' },
                    ],
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare(selection) {
            return {
                title: selection.title || 'Stats Block',
            }
        },
    },
})
