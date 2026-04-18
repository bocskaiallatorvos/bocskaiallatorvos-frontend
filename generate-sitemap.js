// generate-sitemap.js
import fs from "fs";
import fetch from "node-fetch";

const WP = "https://api.bocskaiallatorvos.hu/wp-json/wp/v2";
const BASE = "https://bocskaiallatorvos.hu";

async function fetchAll(endpoint) {
  const res = await fetch(`${WP}/${endpoint}?per_page=100&_fields=slug,modified,modified_gmt,categories,meta`);
  return res.json();
}

function mapCategoryToPath(post) {
  const cats = post.categories || [];

  if (cats.includes(3)) return `/szolgaltatasok/${post.slug}`;
  if (cats.includes(8)) return `/blog/${post.slug}`;
  //if (cats.includes(9)) return `/gyik/${post.slug}`;

  return null; // → nem kerül be a sitemapba
}

function pageIncluded(page) {
  const sitemapFlag = page?.meta?.sitemap;

  // "sitemap": ["igen"]
  if (Array.isArray(sitemapFlag) && sitemapFlag.includes("igen")) {
    return true;
  }

  return false;
}

function formatLastmod(item) {
  if (!item?.modified_gmt) return null;
  return new Date(`${item.modified_gmt}Z`).toISOString();
  // ha csak dátum kell:
  // return item.modified_gmt.split("T")[0];
}

async function run() {
  const pages = await fetchAll("pages");
  const posts = await fetchAll("posts");

  const pageUrls = pages
    .filter(pageIncluded)
    .map(p => ({
      loc: `${BASE}/${p.slug}`,
      lastmod: formatLastmod(p),
    }));

  const postUrls = posts
    .map(p => {
      const path = mapCategoryToPath(p);
      if (!path) return null;
      return {
        loc: `${BASE}${path}`,
        lastmod: formatLastmod(p)
      };
    })
    .filter(Boolean);

  const urls = [...pageUrls, ...postUrls]; 

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
      .map(
        u => `<url>
  <loc>${u.loc}</loc>
  <lastmod>${u.lastmod}</lastmod>
</url>`
      )
      .join("")}
</urlset>`;

  fs.writeFileSync("./dist/sitemap.xml", xml, "utf8");
  console.log("✔ sitemap.xml ready");
  // ---------- robots.txt ----------
  const robots = `User-agent: *
Allow: /
Sitemap: ${BASE}/sitemap.xml
`;

  fs.writeFileSync("./dist/robots.txt", robots, "utf8");
  console.log("✔ robots.txt ready");
}

run();