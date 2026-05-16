import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'socialLink',
    title: 'Social Link',
    type: 'object',
    fields: [
        defineField({
            name: 'platform',
            title: 'Platform',
            type: 'string',
            options: {
                list: [
                    { title: 'Twitter', value: 'twitter' },
                    { title: 'Instagram', value: 'instagram' },
                    { title: 'LinkedIn', value: 'linkedin' },
                    { title: 'Facebook', value: 'facebook' },
                    { title: 'Dribbble', value: 'dribbble' },
                    { title: 'Behance', value: 'behance' },
                    { title: 'GitHub', value: 'github' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'url',
            title: 'URL',
            type: 'url',
            validation: (Rule) => Rule.required(),
        }),
    ],
})
