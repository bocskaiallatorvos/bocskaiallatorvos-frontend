export interface Service {
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  detailed_content: string | null;
  slug: string | null;
  meta: {
     [key: string]: string[];
  }
}