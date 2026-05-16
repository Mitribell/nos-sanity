import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'person',
    title: 'Person',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'photo',
            title: 'Photo',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'array',
            of: [
                {
                    type: 'block',
                    marks: {
                        decorators: [
                            { title: 'Bold', value: 'strong' },
                            { title: 'Italic', value: 'em' },
                        ],
                    },
                },
            ],
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [{ type: 'socialLink' }],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'photo',
        },
        prepare(selection) {
            return {
                title: selection.title,
                subtitle: selection.subtitle,
                media: selection.media,
            }
        },
    },
})
