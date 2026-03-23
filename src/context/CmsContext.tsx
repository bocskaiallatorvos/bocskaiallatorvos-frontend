import React, { createContext, useContext, useEffect, useState } from "react";
import { WPPage, WPMedia, WPPosts, WPPartners, WPGallery } from "../interfaces/WordpressInterfaces";

interface CmsContextType {
  pages: WPPage[];
  media: WPMedia[];
  posts: WPPosts[];
  partners: WPPartners[];
  gallery: WPGallery[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<WPPage[]>([]);
  const [media, setMedia] = useState<WPMedia[]>([]);
  const [posts, setPosts] = useState<WPPosts[]>([]);
  const [partners, setPartners] = useState<WPPartners[]>([]);
  const [gallery, setGallery] = useState<WPGallery[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const cacheFile =
    import.meta.env.MODE === "production"
      ? "/cms-cache.json"
      : "/dist/cms-cache.json";

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);

      try {
        const cacheRes = await fetch(cacheFile);
        const contentType = cacheRes.headers.get("content-type") || "";
    
        if (contentType.includes("application/json")) {
          let cacheJson = await cacheRes.json();
          console.log("➡️ Cache ready → JSON loaded");

          setPages(cacheJson.pages);
          setMedia(cacheJson.media);
          setPosts(cacheJson.posts);
          setPartners(cacheJson.partners);
          setGallery(cacheJson.gallery);
          setError(null);
          setReady(true); // 👈 csak ha minden adat bejött */

        } else {
          const [pagesRes, mediaRes, postsRes, partnersRes, galleriesRes] = await Promise.all([
            fetch(`${apiUrl}/pages?_fields=id,parent,menu_order,slug,title,content,meta,featured_media&orderby=menu_order&order=asc&per_page=100`),
            fetch(`${apiUrl}/media?_fields=id,slug,guid,caption&orderby=id&order=asc&per_page=100&per_page=3000`),
            fetch(`${apiUrl}/posts?_fields=meta,id,date_gmt,title,excerpt,content,slug,categories,tag_names,featured_image_url,menu_order&orderby=menu_order&order=asc&per_page=100`),
            fetch(`${apiUrl}/partners`),
            fetch(`${apiUrl}/galleries`)
          ]);

          const [pagesData, mediaData, postsData, partnersData, galleriesData] = await Promise.all([
            pagesRes.json(),
            mediaRes.json(),
            postsRes.json(),
            partnersRes.json(),
            galleriesRes.json()
          ]);

          if (!isMounted) return;

          setPages(pagesData);
          setMedia(mediaData);
          setPosts(postsData);
          setPartners(partnersData);
          setGallery(galleriesData);
          setError(null);
          setReady(true); // 👈 csak ha minden adat bejött
        }
      } catch {
        if (isMounted) setError("Hiba történt az adatok lekérésekor.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [apiUrl]);

  // Skeleton betöltő komponens
  if (!ready || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-4xl space-y-6 p-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-4">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <CmsContext.Provider value={{ pages, media, posts, partners, gallery, loading, error, refresh: () => window.location.reload() }}>
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = (): CmsContextType => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error("useCms csak CmsProvider-en belül használható!");
  }
  return context;
};