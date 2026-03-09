import { useEffect, useState, useRef } from "react";
import { WPPage } from "../interfaces/WordpressInterfaces";
//import { useLocation } from "react-router-dom";

interface MetaAttributes {
    title?: string;
    description?: string;
    canonical?: string;
    og_title?: string;
    og_description?: string;
    og_url?: string;
    og_image?: string;
    twitter_title?: string;
    twitter_description?: string;
    twitter_image?: string;
    robots?: string;
    schema?: any;
}

const apiUrl = import.meta.env.VITE_API_URL;

const originalPushState = window.history.pushState;
window.history.pushState = function (...args) {
    originalPushState.apply(this, args);
    window.dispatchEvent(new Event("urlchange"));
};

const originalReplaceState = window.history.replaceState;
window.history.replaceState = function (...args) {
    originalReplaceState.apply(this, args);
    window.dispatchEvent(new Event("urlchange"));
};

const MetaFetcher = () => {
    //const location = useLocation();
    const [meta, setMeta] = useState<MetaAttributes>({});
    const lastSlug = useRef<string>("");

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                //const slug = location.pathname.replace(/^\/+|\/+$/g, "") || "fooldal";
                const slug = window.location.pathname.replace(/^\/+|\/+$/g, "") || "fooldal";
                if (slug === lastSlug.current) return;
                lastSlug.current = slug;

                const cacheFile =
                    import.meta.env.MODE === "production"
                        ? "cms-cache.json"
                        : "/dist/cms-cache.json";

                const cacheRes = await fetch(cacheFile);
                const contentType = cacheRes.headers.get("content-type") || "";

                let pageData;

                if (contentType.includes("application/json")) {
                    let cacheJson = await cacheRes.json();

                    const filteredPage = cacheJson.pages.filter((item: WPPage) => item.slug === slug);
                    pageData = filteredPage.slice(-1)[0] || [];
                } else {
                    const res = await fetch(
                        `${apiUrl}/pages?slug=${slug}&_embed`
                    );
                    pageData = (await res.json())?.[0];
                }
                
                const ogImageUrl = pageData?._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                const title = pageData?.meta?.meta_title?.[0] ?? "";
                const description = pageData?.meta?.meta_description?.[0] ?? "";

                setMeta({
                    title,
                    description,
                    og_title: title,
                    og_description: description,
                    og_url: window.location.origin + location.pathname,
                    og_image: ogImageUrl,
                    twitter_title: title,
                    twitter_description: description,
                    twitter_image: ogImageUrl,
                    robots: 'index, follow',
                });

            } catch (err) {
                console.error("Meta fetch error:", err);
            }
        };
        fetchMeta();

        window.addEventListener("popstate", fetchMeta);
        window.addEventListener("urlchange", fetchMeta);

        return () => {
            window.removeEventListener("popstate", fetchMeta);
            window.removeEventListener("urlchange", fetchMeta);
        };
    }, []);

    useEffect(() => {

        const setMetaTag = (attrName: "name" | "property", name: string, value: string) => {
            let selector = `meta[${attrName}="${name}"]`;
            let elem = document.querySelector(selector) as HTMLMetaElement | null;
            if (!elem) {
                elem = document.createElement("meta");
                elem.setAttribute(attrName, name);
                document.head.appendChild(elem);
            }
            elem.setAttribute("content", value);
        };

        if (meta.robots) {
            setMetaTag("name", "robots", meta.robots);
        }
        if (meta.title) document.title = meta.title;

        if (meta.description) {
            setMetaTag("name", "description", meta.description);
        }
        /*if (meta.canonical) {
            let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
            if (!link) {
                link = document.createElement('link');
                link.setAttribute('rel', 'canonical');
                document.head.appendChild(link);
            }
            link.setAttribute('href', meta.canonical);
        } */
        if (meta.og_title) {
            setMetaTag("property", "og:title", meta.og_title);
        }
        if (meta.og_description) {
            setMetaTag("property", "og:description", meta.og_description);
        }
        if (meta.og_url) {
            setMetaTag("property", "og:url", meta.og_url);
        }
        if (meta.og_image && meta.og_image.length > 0) {
            setMetaTag("property", "og:image", meta.og_image);
        }
        if (meta.twitter_title) {
            setMetaTag("property", "twitter:title", meta.twitter_title);
        }
        if (meta.twitter_description) {
            setMetaTag("property", "twitter:description", meta.twitter_description);
        }
        if (meta.twitter_image) {
            setMetaTag("property", "twitter:image", meta.twitter_image);
        }
    }, [meta]);

    return null;
};

export default MetaFetcher;
