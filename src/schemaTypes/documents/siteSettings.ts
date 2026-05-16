import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'siteTitle',
            title: 'Site Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'siteDescription',
            title: 'Site Description',
            type: 'text',
            rows: 2,
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'logo',
            title: 'Logo',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'defaultSeo',
            title: 'Default SEO',
            type: 'seo',
        }),
        defineField({
            name: 'mainNavigation',
            title: 'Main Navigation',
            type: 'array',
            of: [{ type: 'link' }],
        }),
        defineField({
            name: 'footerNavigation',
            title: 'Footer Navigation',
            type: 'array',
            of: [{ type: 'link' }],
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Links',
            type: 'array',
            of: [{ type: 'socialLink' }],
        }),
        defineField({
            name: 'contactEmail',
            title: 'Contact Email',
            type: 'string',
        }),
        defineField({
            name: 'calendarUrl',
            title: 'Calendar URL',
            type: 'url',
        }),
    ],
})
