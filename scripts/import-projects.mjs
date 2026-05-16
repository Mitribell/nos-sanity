import { createReadStream } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const dirname = fileURLToPath(new URL(".", import.meta.url));
const require = createRequire(import.meta.url);
const { getCliClient } = require("@sanity/cli");
const dataPath = join(dirname, "projects-import-data.json");
const downloadDir = join(dirname, ".tmp-project-images");
const data = JSON.parse(await readFile(dataPath, "utf8"));

const client = getCliClient({ apiVersion: "2026-05-16" });
const refreshAssets = process.argv.includes("--refresh-assets");

const serviceDescriptions = {
  "Brand platform": "Strategic foundation for positioning, voice, and brand behavior.",
  "Brand strategy": "Strategic work that defines positioning, audience, and market direction.",
  "Campaign materials": "Visual and written materials created for campaign rollout.",
  "Communication strategy": "Messaging and channel strategy for public-facing communication.",
  "Creative campaign": "Concept-led campaign work across formats and touchpoints.",
  "Creative idea": "Core creative concept for a campaign, launch, or communication task.",
  "Digital campaign": "Digital-first campaign materials and communication assets.",
  "Event platform": "Concept and communication platform for event-based brand activity.",
  "Key visual": "Lead visual direction for campaigns and brand systems.",
  "Marketing strategy": "Market, audience, and activation strategy for growth and promotion.",
  "Menu design": "Design system and layout work for food and hospitality menus.",
  "Motion video": "Animated video and motion assets for campaign communication.",
  "Naming": "Name development rooted in brand strategy and audience clarity.",
  "Packaging": "Packaging concepts and systems for physical products.",
  "Video campaign": "Video-led creative communication for digital and social channels.",
  "Visual identity": "Logo, visual language, and identity system development.",
  "Website": "Website structure, interface direction, and digital presentation.",
};

const industryDescriptions = {
  Agriculture: "Agriculture and food production brands.",
  Beverage: "Beverage brands, festivals, and retail communication.",
  "Education & Fitness": "Education, sport, and fitness-related projects.",
  Hospitality: "Hotels, restaurants, and place-based hospitality brands.",
  "Music & Culture": "Music, culture, and community projects.",
  Retail: "Retail brands and customer-facing campaigns.",
  "Retail & Beverage": "Retail and beverage projects with event or product focus.",
  "Technology & Accessories": "Consumer technology and accessory brands.",
};

function slugify(value, fallback) {
  const slug = value
    .toString()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || fallback;
}

function ref(type, title, fallback) {
  return {
    _type: "reference",
    _ref: `${type}-${slugify(title, fallback)}`,
    _key: `${type}-${slugify(title, fallback)}`,
  };
}

function block(text, index) {
  return {
    _type: "block",
    _key: `block-${index}`,
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `span-${index}`,
        text,
        marks: [],
      },
    ],
  };
}

async function download(url) {
  await mkdir(downloadDir, { recursive: true });
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Could not download ${url}: ${response.status}`);
  }

  const path = join(downloadDir, basename(new URL(url).pathname));
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(path, buffer);

  return path;
}

async function uploadImage(url, title) {
  const path = await download(url);
  const asset = await client.assets.upload("image", createReadStream(path), {
    filename: basename(path),
    title,
  });

  return {
    _type: "image",
    asset: {
      _type: "reference",
      _ref: asset._id,
    },
  };
}

async function existingProject(id) {
  return client.fetch(
    '*[_id == $id][0]{coverImage, imageGallery}',
    { id },
    { perspective: "raw" },
  );
}

async function main() {
  const projects = data.projects;
  const clients = new Map();
  const services = new Map();
  const industries = new Map();

  for (const project of projects) {
    clients.set(project.client, project.slug);
    industries.set(project.industry, project.industry);

    for (const service of project.services) {
      services.set(service, service);
    }
  }

  const docs = [];

  for (const [title, fallback] of clients.entries()) {
    docs.push({
      _id: `client-${slugify(title, fallback)}`,
      _type: "client",
      title,
      slug: { _type: "slug", current: slugify(title, fallback) },
    });
  }

  for (const title of industries.keys()) {
    docs.push({
      _id: `industry-${slugify(title, "industry")}`,
      _type: "industry",
      title,
      slug: { _type: "slug", current: slugify(title, "industry") },
      description: industryDescriptions[title],
    });
  }

  for (const title of services.keys()) {
    docs.push({
      _id: `service-${slugify(title, "service")}`,
      _type: "service",
      title,
      slug: { _type: "slug", current: slugify(title, "service") },
      shortDescription:
        serviceDescriptions[title] || "Specialized service area for NOS projects.",
    });
  }

  for (const project of projects) {
    const id = `project-${project.slug}`;
    const existing = refreshAssets ? null : await existingProject(id);
    const coverImage =
      existing?.coverImage || (await uploadImage(project.imageUrls[0], project.title));
    const imageGallery =
      existing?.imageGallery?.length
        ? existing.imageGallery
        : await Promise.all(
            project.imageUrls.slice(0, 6).map(async (url, index) => ({
              ...(await uploadImage(url, `${project.title} ${index + 1}`)),
              _key: `image-${index}`,
            })),
          );

    docs.push({
      _id: id,
      _type: "project",
      title: project.title,
      slug: { _type: "slug", current: project.slug },
      client: ref("client", project.client, project.slug),
      year: project.year,
      excerpt: project.excerpt,
      shortDescription: project.shortDescription,
      longDescription: project.longDescription.map(block),
      coverImage,
      heroMedia: {
        _type: "object",
        mediaType: "image",
        image: coverImage,
      },
      imageGallery,
      featured: project.slug === "make" || project.slug === "autobiography",
      services: project.services.map((service) =>
        ref("service", service, `service-${project.slug}`),
      ),
      industries: [ref("industry", project.industry, `industry-${project.slug}`)],
      seo: {
        _type: "seo",
        metaTitle: `${project.title} / NOS`,
        metaDescription: project.excerpt,
      },
    });
  }

  for (const doc of docs) {
    await client.createOrReplace(doc);
    console.log(`upserted ${doc._type}: ${doc.title}`);
  }

  console.log(`Imported ${projects.length} projects. Vo! was excluded.`);
}

await main();
