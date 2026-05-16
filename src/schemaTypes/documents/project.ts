import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'project',
    title: 'Project',
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
            name: 'client',
            title: 'Client',
            type: 'reference',
            to: [{ type: 'client' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'year',
            title: 'Year',
            type: 'number',
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 2,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'shortDescription',
            title: 'Short Description',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'longDescription',
            title: 'Long Description',
            type: 'portableText',
        }),
        defineField({
            name: 'imageGallery',
            title: 'Image Gallery',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        }),
        defineField({
            name: 'videoGallery',
            title: 'Video Gallery',
            type: 'array',
            of: [
                {
                    type: 'file',
                    options: {
                        accept: 'video/*',
                    },
                },
            ],
        }),
        defineField({
            name: 'coverImage',
            title: 'Cover Image',
            type: 'image',
            options: { hotspot: true },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'heroMedia',
            title: 'Hero Media (Image or Video)',
            type: 'object',
            fields: [
                defineField({
                    name: 'mediaType',
                    title: 'Media Type',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Image', value: 'image' },
                            { title: 'Video', value: 'video' },
                        ],
                        layout: 'radio',
                    },
                    initialValue: 'image',
                    validation: (Rule) => Rule.required(),
                }),
                defineField({
                    name: 'image',
                    title: 'Image',
                    type: 'image',
                    options: { hotspot: true },
                    hidden: ({ parent }) => parent?.mediaType !== 'image',
                    validation: (Rule) =>
                        Rule.custom((value, context) => {
                            const parent = context.parent as { mediaType?: string } | undefined

                            if (parent?.mediaType === 'image' && !value) {
                                return 'Image is required when media type is image'
                            }

                            return true
                        }),
                }),
                defineField({
                    name: 'video',
                    title: 'Video',
                    type: 'file',
                    options: {
                        accept: 'video/*',
                    },
                    hidden: ({ parent }) => parent?.mediaType !== 'video',
                    validation: (Rule) =>
                        Rule.custom((value, context) => {
                            const parent = context.parent as { mediaType?: string } | undefined

                            if (parent?.mediaType === 'video' && !value) {
                                return 'Video is required when media type is video'
                            }

                            return true
                        }),
                }),
            ],
        }),
        defineField({
            name: 'featured',
            title: 'Featured',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'services',
            title: 'Services',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'service' }],
                },
            ],
        }),
        defineField({
            name: 'industries',
            title: 'Industries',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'industry' }],
                },
            ],
        }),
        defineField({
            name: 'projectTypes',
            title: 'Project Types',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'projectType' }],
                },
            ],
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
            client: 'client.title',
            media: 'coverImage',
        },
        prepare(selection) {
            return {
                title: selection.title,
                subtitle: selection.client,
                media: selection.media,
            }
        },
    },
})
