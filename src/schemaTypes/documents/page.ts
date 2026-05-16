import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'page',
    title: 'Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
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
            name: 'layoutBlocks',
            title: 'Layout Blocks',
            type: 'array',
            of: [
                { type: 'heroBlock' },
                { type: 'textBlock' },
                { type: 'imageBlock' },
                { type: 'galleryBlock' },
                { type: 'videoBlock' },
                { type: 'quoteBlock' },
                { type: 'statsBlock' },
                { type: 'projectsGridBlock' },
                { type: 'servicesListBlock' },
                { type: 'ctaBlock' },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'seo',
            title: 'SEO',
            type: 'seo',
        }),
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare(selection) {
            return {
                title: selection.title,
            }
        },
    },
})
