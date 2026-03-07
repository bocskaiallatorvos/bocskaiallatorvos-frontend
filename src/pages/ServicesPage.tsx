import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import ServiceCard from '../components/services/ServiceCard';
import Pagination from '../components/Pagination';
import { useCms } from '../context/CmsContext';
import { Service } from '../interfaces/ServicesInterface';
import { transformWPPostToService } from '../components/transformation/TransformWPPostToService';

const ITEMS_PER_PAGE = 12;

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const { posts, error } = useCms();

  useEffect(() => {
    getPaginatedServices();
  }, [currentPage]);

  const getPaginatedServices = async () => {
    setLoading(true);
    try {
      const filteredPost = posts.filter(item => item.categories.includes(3));
   
      if (error) throw error;
   
      const from = (currentPage -1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE;
      
      const services: Service[] = filteredPost.map(transformWPPostToService);

      const selectedServices = services.slice(from, to);

      setServices(selectedServices || []);
      setTotalCount(services.length || 0);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="servicesList" className="py-20 bg-gradient-to-b from-brand to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl font-bold text-brandHeaderColor mb-8 text-center">
            Állatorvosi szolgáltatások
          </h1>
          <p className="text-xl sm:text-2xl text-brandColor max-w-3xl mx-auto leading-relaxed">
           Szakszerű egészségügyi ellátás kedvence számára
          </p>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
            <p className="mt-4 text-brandHeaderColor">Szolgáltatások betöltése...</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-brandHeaderColor">
              Jelenleg nincsenek elérhető szolgáltatások.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}

            <div className="mt-12 text-center">
              <p className="text-brandHeaderColor">
                Összesen <span className="font-semibold text-brandColor">{totalCount}</span> szolgáltatás
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
