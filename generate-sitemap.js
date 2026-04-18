import fs from "fs";
import fetch from "node-fetch";

const WP = "https://api.bocskaiallatorvos.hu/wp-json/wp/v2";
const BASE = "https://bocskaiallatorvos.hu";

async function fetchAll(endpoint) {
  const url = `${WP}/${endpoint}?per_page=100&_fields=slug,modified,modified_gmt,categories,meta`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "Render sitemap generator",
    },
  });

  const contentType = res.headers.get("content-type") || "";
  const text = await res.text();

  if (!res.ok) {
    throw new Error(
      `HTTP ${res.status} ${res.statusText} - ${url}\n\n${text.slice(0, 500)}`
    );
  }

  if (!contentType.includes("application/json")) {
    throw new Error(
      `Nem JSON válasz jött: ${url}\nContent-Type: ${contentType}\n\n${text.slice(0, 500)}`
    );
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(
      `Hibás JSON válasz: ${url}\n\n${text.slice(0, 500)}`
    );
  }
}

function mapCategoryToPath(post) {
  const cats = post.categories || [];

  if (cats.includes(3)) return `/szolgaltatasok/${post.slug}`;
  if (cats.includes(8)) return `/blog/${post.slug}`;

  return null;
}

function pageIncluded(page) {
  const sitemapFlag = page?.meta?.sitemap;
  return Array.isArray(sitemapFlag) && sitemapFlag.includes("igen");
}

function formatLastmod(item) {
  if (!item?.modified_gmt) return null;
  return new Date(`${item.modified_gmt}Z`).toISOString();
}

async function run() {
  const pages = await fetchAll("pages");
  const posts = await fetchAll("posts");

  const pageUrls = pages
    .filter(pageIncluded)
    .map((p) => ({
      loc: `${BASE}/${p.slug}`,
      lastmod: formatLastmod(p),
    }));

  const postUrls = posts
    .map((p) => {
      const path = mapCategoryToPath(p);
      if (!path) return null;

      return {
        loc: `${BASE}${path}`,
        lastmod: formatLastmod(p),
      };
    })
    .filter(Boolean);

  const urls = [...pageUrls, ...postUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `<url>
  <loc>${u.loc}</loc>
  <lastmod>${u.lastmod}</lastmod>
</url>`
  )
  .join("\n")}
</urlset>`;

  fs.writeFileSync("./dist/sitemap.xml", xml, "utf8");
  console.log("sitemap.xml ready");

  const robots = `User-agent: *
Allow: /
Sitemap: ${BASE}/sitemap.xml
`;

  fs.writeFileSync("./dist/robots.txt", robots, "utf8");
  console.log("robots.txt ready");
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});