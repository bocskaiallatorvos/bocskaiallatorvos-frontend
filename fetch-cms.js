import fs from "fs";
import fetch from "node-fetch";

const apiUrl = "https://api.bocskaiallatorvos.hu/wp-json/wp/v2";

async function run() {
  console.log("➡️ Fetching data from WordPress…");

  const [pagesRes, mediaRes, postsRes, partnersRes, galleriesRes] =
    await Promise.all([
      fetch(`${apiUrl}/pages?_fields=id,parent,menu_order,slug,title,content,meta,featured_media&orderby=menu_order&order=asc&per_page=100`),
      fetch(`${apiUrl}/media?_fields=id,slug,guid,caption&orderby=id&order=asc&per_page=100`),
      fetch(`${apiUrl}/posts?_fields=meta,id,date_gmt,title,excerpt,content,slug,categories,tag_names,featured_image_url,menu_order&orderby=menu_order&order=asc&per_page=100`),
      fetch(`${apiUrl}/partners`),
      fetch(`${apiUrl}/galleries`)
    ]);

  const data = {
    pages: await pagesRes.json(),
    media: await mediaRes.json(),
    posts: await postsRes.json(),
    partners: await partnersRes.json(),
    gallery: await galleriesRes.json(),
    generatedAt: new Date().toISOString(),
  };

  fs.writeFileSync("./dist/cms-cache.json", JSON.stringify(data, null, 2), "utf8");
  console.log("✅ CMS cache ready → cms-cache.json");
}

run();
