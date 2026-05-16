# NOS Sanity Studio

A complete content management system for the NOS agency portfolio website, built with Sanity Studio.

## Features

- **Project Management**: Complete project documentation with multimedia content
- **Page Builder**: Flexible page layouts with modular content blocks
- **Taxonomy System**: Industries, project types, tags, and services
- **Team Management**: Team member profiles with bios and social links
- **Client Database**: Client information and logo management
- **Blog/Notes**: Article publishing with author attribution
- **SEO Management**: Meta tags and Open Graph image optimization
- **Site Settings**: Global configuration for navigation and social links

## Project Structure

```
src/
  schemaTypes/
    documents/     # Document type schemas
    objects/       # Reusable object type schemas
    index.ts       # Schema exports
```

### Document Types

- **Project**: Portfolio project with multimedia content blocks
- **Page**: CMS-managed pages with flexible layouts
- **Service**: Service offerings with related projects
- **Person**: Team member profiles
- **Client**: Client information and branding
- **Industry**: Industry taxonomy
- **Tag**: Tagging system for projects and content
- **ProjectType**: Project categorization
- **Note**: Blog posts/articles
- **SiteSettings**: Global site configuration

### Content Block Types

- Hero Block: Featured intro with media
- Text Block: Rich text sections
- Image Block: Single images with captions
- Gallery Block: Image galleries
- Video Block: Embedded video content
- Quote Block: Testimonials and quotes
- Stats Block: Statistics/metrics display
- Process Block: Step-by-step processes
- Projects Grid Block: Dynamic project listings
- Services List Block: Service catalog
- CTA Block: Call-to-action sections
- Credits Block: Team and contributor credits

## Setup Instructions

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nos-sanity
```

2. Install dependencies:
```bash
npm install
```

3. Configure Sanity Project:

   - Get your Sanity project ID from [sanity.io](https://sanity.io)
   - Update `YOUR_PROJECT_ID` in:
     - `sanity.config.ts`
     - `sanity.cli.ts`

4. Start development server:
```bash
npm run dev
```

5. Open Sanity Studio:
   - Navigate to `http://localhost:3333`
   - Sign in with your Sanity account

## Available Scripts

- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm run build` - Build for production
- `npm run deploy` - Deploy studio to Sanity CDN

## Schema Architecture

All schemas follow Sanity best practices:
- Use of `defineType` and `defineField` for type safety
- Proper validation with `Rule.required()` for critical fields
- Slug fields with automatic source generation
- Preview configurations for better UX in studio
- References instead of string enums for taxonomies
- Structured portable text for rich content

## Environment Configuration

Create a `.env.local` file in the root directory:

```
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
```

## Building the Frontend

This repository contains only the Sanity Studio content model. To build the frontend website:

1. Create a separate Next.js/React project
2. Install `@sanity/client` for API queries
3. Use GROQ queries to fetch content from this Sanity project
4. Reference the schema types for TypeScript support

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity CLI Reference](https://www.sanity.io/docs/cli)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Portable Text Specification](https://www.portabletext.org)

## License

Proprietary - NOS Agency
