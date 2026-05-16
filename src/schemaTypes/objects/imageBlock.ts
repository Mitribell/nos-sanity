import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'imageBlock',
    title: 'Image Block',
    type: 'object',
    fields: [
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'caption',
            title: 'Caption',
            type: 'string',
        }),
        defineField({
            name: 'alt',
            title: 'Alt Text',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            media: 'image',
            title: 'caption',
        },
        prepare(selection) {
            return {
                title: selection.title || 'Image Block',
                media: selection.media,
            }
        },
    },
})
