import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'colorTheme',
    title: 'Color Theme',
    type: 'object',
    fields: [
        defineField({
            name: 'primary',
            title: 'Primary Color',
            type: 'string',
        }),
        defineField({
            name: 'secondary',
            title: 'Secondary Color',
            type: 'string',
        }),
        defineField({
            name: 'accent',
            title: 'Accent Color',
            type: 'string',
        }),
    ],
})
