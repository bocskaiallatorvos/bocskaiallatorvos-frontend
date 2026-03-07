import { Link } from 'react-router-dom';
import { Service } from '../../interfaces/ServicesInterface';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      to={`/szolgaltatasok/${service.slug}`}
      className="block h-full"
    >
      <article className="group relative flex flex-col bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer h-full">
        <div className="relative h-64 overflow-hidden">
          <img
            src={service.image_url}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {service.category && (
            <span className="absolute top-4 right-4 bg-brandButtonHover text-white px-3 py-1 rounded-full text-sm font-medium">
              {service.category}
            </span>
          )}
        </div>

        <div className="flex flex-col flex-grow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brandButtonHover transition-colors duration-300">
            {service?.meta?.title?.slice(-1)[0] ?? service.title}
          </h3>
          <div
            className="text-gray-600 leading-relaxed line-clamp-3 flex-grow"
            dangerouslySetInnerHTML={{ __html: service.description || "" }}
          />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brandButton to-brandSection transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </article>
    </Link>
  );
}
