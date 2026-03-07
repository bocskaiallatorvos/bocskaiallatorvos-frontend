import { useEffect } from 'react';

interface MetaTagsProps {
  title: string;
  description: string;
  ogImage?: string;
  url?: string;
}

export function MetaTags({ title, description, ogImage, url }: MetaTagsProps) {
  useEffect(() => {
    document.title = title;

    const metaTags = [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ];

    if (ogImage) {
      metaTags.push(
        { property: 'og:image', content: ogImage },
        { name: 'twitter:image', content: ogImage }
      );
    }

    if (url) {
      metaTags.push({ property: 'og:url', content: url });
    }

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);

      if (!element) {
        element = document.createElement('meta');
        if (name) element.setAttribute('name', name);
        if (property) element.setAttribute('property', property);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    });

    return () => {
      const defaultTitle = document.querySelector('title[data-default]')?.textContent;
      if (defaultTitle) {
        document.title = defaultTitle;
      }
    };
  }, [title, description, ogImage, url]);

  return null;
}
