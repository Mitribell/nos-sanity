import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'processBlock',
    title: 'Process Block',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'steps',
            title: 'Process Steps',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'description', type: 'text', title: 'Description', rows: 2 },
                        { name: 'icon', type: 'image', title: 'Icon' },
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
                title: selection.title || 'Process Block',
            }
        },
    },
})
