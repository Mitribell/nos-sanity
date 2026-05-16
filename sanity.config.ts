import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/schemaTypes'

export default defineConfig({
    name: 'default',
    title: 'NOS Sanity Studio',

    projectId: 'ulkx8baj',
    dataset: 'production',

    plugins: [
        structureTool(),
        visionTool(),
    ],

    schema: {
        types: schemaTypes,
    },
})
