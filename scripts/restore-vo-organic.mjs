import { createReadStream } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const { getCliClient } = require("@sanity/cli");
const client = getCliClient({ apiVersion: "2026-05-16" });
const dirname = fileURLToPath(new URL(".", import.meta.url));
const downloadDir = join(dirname, ".tmp-vo-images");

const images = [
  "https://nosagency.com.ua/wp-content/uploads/2023/02/крупы2.jpg",
  "https://nosagency.com.ua/wp-content/uploads/2020/10/kokovo.jpg",
  "https://nosagency.com.ua/wp-content/uploads/2020/10/kokovo1.jpg",
  "https://nosagency.com.ua/wp-content/uploads/2020/10/vo-book.jpg",
  "https://nosagency.com.ua/wp-content/uploads/2020/10/PlanetVo.png",
  "https://nosagency.com.ua/wp-content/uploads/2020/10/vo-eggs-package.jpg",
  "https://nosagency.com.ua/wp-content/uploads/2021/10/vo-red-dot.jpg",
];

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

async function uploadImage(url, title) {
  await mkdir(downloadDir, { recursive: true });
  const response = await fetch(encodeURI(url));

  if (!response.ok) {
    throw new Error(`Could not download ${url}: ${response.status}`);
  }

  const filename = basename(new URL(encodeURI(url)).pathname);
  const path = join(downloadDir, filename);
  await writeFile(path, Buffer.from(await response.arrayBuffer()));

  const asset = await client.assets.upload("image", createReadStream(path), {
    filename,
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

const coverImage = await uploadImage(images[0], "Vo Organic cover");
const imageGallery = await Promise.all(
  images.map(async (url, index) => ({
    ...(await uploadImage(url, `Vo Organic ${index + 1}`)),
    _key: `image-${index}`,
  })),
);

await client.createOrReplace({
  _id: "client-agroecology",
  _type: "client",
  title: "Agroecology",
  slug: { _type: "slug", current: "agroecology" },
});

await client.createOrReplace({
  _id: "industry-organic-food",
  _type: "industry",
  title: "Organic Food",
  slug: { _type: "slug", current: "organic-food" },
});

for (const service of [
  ["Strategy", "Brand and communication strategy for positioning organic food in a sharper way."],
  ["Custom type", "Custom lettering and typographic work for a distinctive brand voice."],
]) {
  await client.createOrReplace({
    _id: `service-${service[0].toLowerCase().replace(/\s+/g, "-")}`,
    _type: "service",
    title: service[0],
    slug: { _type: "slug", current: service[0].toLowerCase().replace(/\s+/g, "-") },
    shortDescription: service[1],
  });
}

await client.createOrReplace({
  _id: "project-vo-organic",
  _type: "project",
  title: "Vo Organic",
  slug: { _type: "slug", current: "vo-organic" },
  client: { _type: "reference", _ref: "client-agroecology" },
  year: 2023,
  excerpt: "A cosmic organic food brand that makes healthy products feel bright, tasty, and memorable.",
  shortDescription:
    "Vo Organic is a brand of organic products that taste cosmic. NOS shaped the strategy, naming, identity, custom type, and packaging around a simple Ukrainian reaction: Vo!",
  longDescription: [
    "Vo Organic is a brand of organic products that taste cosmic. The task was to show how useful food can also be delicious, desirable, and visually distinctive.",
    "The strategy moved away from predictable organic codes and overused words like reliability, harmony, innovation, and naturalness. Instead, the brand speaks with directness, appetite, and a bright emotional charge.",
    "The name Vo! works as an instant reaction to taste and discovery. It turns organic food into something expressive and easy to remember.",
    "The visual system uses cosmic energy, bold packaging, and a custom typographic voice to help the products stand apart in a category that often looks too quiet.",
  ].map(block),
  coverImage,
  heroMedia: {
    _type: "object",
    mediaType: "image",
    image: coverImage,
  },
  imageGallery,
  featured: true,
  services: [
    { _key: "strategy", _type: "reference", _ref: "service-strategy" },
    { _key: "naming", _type: "reference", _ref: "service-naming" },
    { _key: "visual-identity", _type: "reference", _ref: "service-visual-identity" },
    { _key: "custom-type", _type: "reference", _ref: "service-custom-type" },
    { _key: "packaging", _type: "reference", _ref: "service-packaging" },
  ],
  industries: [
    { _key: "organic-food", _type: "reference", _ref: "industry-organic-food" },
  ],
  seo: {
    _type: "seo",
    metaTitle: "Vo Organic / NOS",
    metaDescription:
      "A cosmic organic food brand with strategy, naming, identity, custom type, and packaging by NOS.",
  },
});

console.log("Restored Vo Organic as project-vo-organic.");
