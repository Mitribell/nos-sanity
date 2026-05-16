import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'note',
    title: 'Note',
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
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 2,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: [{ type: 'person' }],
        }),
        defineField({
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                            { title: 'Code', value: 'code' },
                        ],
                    },
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'tag' }],
                },
            ],
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
            author: 'author.name',
            media: 'coverImage',
        },
        prepare(selection) {
            return {
                title: selection.title,
                subtitle: selection.author,
                media: selection.media,
            }
        },
    },
})
