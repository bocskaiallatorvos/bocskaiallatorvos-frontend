export interface WPPage {
    id: number;
    parent: number;
    menu_order: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    featured_media: number;
    meta?: {
        [key: string]: string[] | undefined;
    };
}

export interface WPMedia {
    id: number;
    slug: string;
    alt_text: string;
    guid: { rendered: string };
    caption: { rendered: string };
}

export interface WPPosts {
    id: number;
    menu_order: number;
    slug: string;
    title: { rendered: string };
    excerpt: { rendered: string };
    content: { rendered: string };
    categories: number[];
    featured_image_url: string;
    date_gmt: string;
    tag_names: string;
    meta: {
        [key: string]: string[];
    }
}

export interface WPPartners {
    id: number;
    name: string;
    url: string;
    image: string;
    order: number;
}

export interface WPGallery {
    id: string;
    name: string;
    main_image: string;
    main_image_id: number;
    order: number;
    images?: WPGalleryImageDetail[];
}

export interface WPGalleryImageDetail {
    id: string;
    attachment_id: number;
    title: string;
    description: string;
    src: string;
    order: number;
}