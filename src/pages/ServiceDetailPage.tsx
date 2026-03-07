import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { Service } from '../interfaces/ServicesInterface';
import { useCms } from '../context/CmsContext';
import { transformWPPostToService } from '../components/transformation/TransformWPPostToService';
import { MetaTags } from '../context/MetaTags';


export default function ServiceDetailPage() {
    const [service, setServices] = useState<Service>();
    const { slug } = useParams<{ slug: string }>();
    const { posts } = useCms();

    useEffect(() => {
        const filteredPost = posts.filter(item => item.categories.includes(3) && item.slug === slug);

        const selectedServices: Service[] = filteredPost.map(transformWPPostToService);

        setServices(
            Array.isArray(selectedServices) && selectedServices.length > 0
                ? selectedServices[0]
                : {} as Service
        );
    }, []);

    if (!service) {
        return (
            <section id="serviceDetails" className="py-20 bg-gradient-to-b from-brand to-white">
                <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">
                                Szolgáltatás nem található
                            </h1>
                            <p className="text-gray-600 mb-6">
                                A keresett szolgáltatás nem létezik vagy már nem elérhető.
                            </p>
                            <Link
                                to="/szolgaltatasok"
                                className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Vissza a szolgáltatásokhoz
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const currentUrl = `${window.location.origin}/szolgaltatasok/${service.slug}`;

    return (
        <>
            {<MetaTags
                title={"Bocskai Állategészségügyi Centrum - " + service?.meta?.meta_title?.slice(-1)[0]}
                description={(service?.meta?.meta_description?.slice(-1)[0] ?? '').replace(/<[^>]*>/g, '')}
                ogImage={service?.image_url}
                url={currentUrl}
            />}
            <section id="serviceDetails" className="py-16 bg-gradient-to-b from-brand to-white">
                <div className="min-h-screen">
                    <header className="bg-white shadow-sm sticky top-0 z-10">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mt-6">
                            <Link
                                to="/szolgaltatasok"
                                className="inline-flex items-center gap-2 text-brandButton hover:text-brandButtonHover transition-colors font-medium"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Vissza a szolgáltatásokhoz
                            </Link>
                        </div>
                    </header>

                    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            <div className="relative h-96">
                                <img
                                    src={service.image_url}
                                    alt={service.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                    <div className="text-4xl leading-none md:leading-normal font-bold mb-4">{service?.meta?.title?.slice(-1)[0] ?? service.title}</div>
                                    <div className="flex flex-wrap gap-4 text-sm">
                                        {service.category && (
                                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                                <Tag className="w-4 h-4" />
                                                {service.category}
                                            </div>
                                        )}
                                        {/*<div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(service.created_at).toLocaleDateString('hu-HU')}
                                        </div>*/}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 md:p-12">
                                <div className="prose prose-lg max-w-none section-content">
                                    <h1 className="text-2xl md:text-4xl text-gray-700 leading-tight mb-8 font-medium border-l-4 border-brandButton pl-6 italic">
                                        {service.title}
                                    </h1>

                                    {service.detailed_content && (
                                        <div className="text-gray-700 leading-relaxed space-y-4"
                                            dangerouslySetInnerHTML={{ __html: service.detailed_content || "" }} />
                                    )}
                                </div>

                                <div className="mt-12 pt-8 border-t border-gray-200">
                                    <div className="bg-brand rounded-xl p-6">
                                        <h3 className="text-lg font-semibold text-emerald-900 mb-2">
                                            Kapcsolat és időpontfoglalás
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            <strong>Cím:</strong> 4241 Bocskaikert, Debreceni út 25.<br />
                                        </p>
                                        <div className="flex flex-wrap gap-4">
                                            <a
                                                href="tel:+36302390940"
                                                className="inline-flex items-center gap-2 bg-brandButton hover:bg-brandButtonHover text-black  px-6 py-3 rounded-lg  transition-colors font-medium"
                                            >
                                                +36 30 239 0940
                                            </a>
                                            <Link
                                                to="/kapcsolat#contact"
                                                className="inline-flex items-center gap-2 bg-white text-black border-2 border-brandButton px-6 py-3 rounded-lg hover:bg-lime-50 transition-colors font-medium"
                                            >
                                                Email küldése
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </>
    );
}
