import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'creditsBlock',
    title: 'Credits Block',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            initialValue: 'Credits',
        }),
        defineField({
            name: 'credits',
            title: 'Credits',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'role', type: 'string', title: 'Role' },
                        {
                            name: 'people',
                            type: 'array',
                            title: 'People',
                            of: [
                                {
                                    type: 'reference',
                                    to: [{ type: 'person' }],
                                },
                            ],
                        },
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
                title: selection.title || 'Credits Block',
            }
        },
    },
})
