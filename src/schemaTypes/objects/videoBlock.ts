import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'videoBlock',
    title: 'Video Block',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
        }),
        defineField({
            name: 'videoUrl',
            title: 'Video URL',
            type: 'url',
            validation: (Rule) => Rule.required(),
            description: 'YouTube or Vimeo URL',
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
        }),
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare(selection) {
            return {
                title: selection.title || 'Video Block',
            }
        },
    },
})
