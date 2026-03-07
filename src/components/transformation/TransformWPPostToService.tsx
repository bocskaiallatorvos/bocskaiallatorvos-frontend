
import { split } from 'sentence-splitter';
import { WPPosts } from '../../interfaces/WordpressInterfaces';
import { Service } from '../../interfaces/ServicesInterface';

function getFirstSentence(text: string): string {
  const sentences = split(text)
    .filter(node => node.type === 'Sentence')
    .map(node => node.raw.trim());

  return sentences.length > 0 ? sentences[0] : text;
}

export function transformWPPostToService(post: WPPosts): Service {
  return {
    id: post.id, 
    title: post.title.rendered,
    description: getFirstSentence(post.excerpt.rendered),
    image_url: post.featured_image_url, 
    category: post.tag_names ?? '', 
    display_order: post.menu_order,
    is_active: true,
    created_at: new Date(post.date_gmt).toISOString(), 
    detailed_content: post.content?.rendered ?? null,
    slug: post.slug ?? null,
    meta: post.meta
  };
}