import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'link',
    title: 'Link',
    type: 'object',
    fields: [
        defineField({
            name: 'text',
            title: 'Link Text',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'href',
            title: 'URL',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'external',
            title: 'External Link',
            type: 'boolean',
            initialValue: false,
        }),
    ],
})
