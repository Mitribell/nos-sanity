import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'ctaBlock',
    title: 'CTA Block',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'cta',
            title: 'Call to Action',
            type: 'link',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'backgroundColor',
            title: 'Background Color',
            type: 'string',
            description: 'Hex color or CSS color name',
        }),
    ],
    preview: {
        select: {
            title: 'heading',
        },
        prepare(selection) {
            return {
                title: selection.title || 'CTA Block',
            }
        },
    },
})
