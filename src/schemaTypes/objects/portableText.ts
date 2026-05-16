import { defineType } from 'sanity'

export default defineType({
    name: 'portableText',
    title: 'Portable Text',
    type: 'array',
    of: [
        {
            type: 'block',
            marks: {
                decorators: [
                    { title: 'Bold', value: 'strong' },
                    { title: 'Italic', value: 'em' },
                    { title: 'Code', value: 'code' },
                    { title: 'Underline', value: 'underline' },
                ],
                annotations: [
                    {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                            {
                                name: 'href',
                                type: 'url',
                                title: 'URL',
                            },
                        ],
                    },
                ],
            },
        },
        {
            type: 'image',
            options: { hotspot: true },
        },
    ],
})
