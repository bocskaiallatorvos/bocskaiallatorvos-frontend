import { WPPosts } from '../../interfaces/WordpressInterfaces';
import { getReadTime } from './BlogReadTimeCalculator';
import { Link } from './Link';
import { Clock } from 'lucide-react';

interface BlogCardProps {
  post: WPPosts;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={post.featured_image_url}
          alt={post.title.rendered}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-brandButtonHover transition-colors duration-300 line-clamp-2">
          {post.title.rendered}
        </h2>

        <div className="text-gray-600 mb-4 line-clamp-3 leading-relaxed" 
        dangerouslySetInnerHTML={{ __html: post.excerpt.rendered || "" }} />

        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
           {/* <User className="w-4 h-4" />
            <span>{post.author}</span> */}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{getReadTime(post.content.rendered)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
