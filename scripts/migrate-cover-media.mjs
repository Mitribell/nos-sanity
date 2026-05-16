import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { getCliClient } = require("@sanity/cli");
const client = getCliClient({ apiVersion: "2026-05-16" });

const projects = await client.fetch(
  "*[_type == 'project' && !defined(coverMedia) && defined(coverImage)]{_id, coverImage}",
  {},
  { perspective: "raw" },
);

for (const project of projects) {
  await client
    .patch(project._id)
    .set({
      coverMedia: {
        _type: "object",
        mediaType: "image",
        image: project.coverImage,
      },
    })
    .commit({ visibility: "sync" });

  console.log(`migrated ${project._id}`);
}

console.log(`Migrated ${projects.length} projects to coverMedia.`);
