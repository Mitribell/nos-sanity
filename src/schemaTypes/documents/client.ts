import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'client',
    title: 'Client',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Company Name',
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
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'website',
            title: 'Website URL',
            type: 'url',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'logo',
        },
        prepare(selection) {
            return {
                title: selection.title,
                media: selection.media,
            }
        },
    },
})
