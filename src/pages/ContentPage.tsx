import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { WPPage } from '../interfaces/WordpressInterfaces';

export default function ContentPage() {
    const { pages } = useCms();
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [pageContent, setPageContent] = useState<WPPage>();

    useEffect(() => {
        try {
            setLoading(true);
            const filteredPage = pages.filter(item => item.slug === location.pathname.slice(1));
            setPageContent(filteredPage.slice(-1)[0] || []);

        }
        catch (err) {
            console.error('Error fetching pagecontent:', err);
        }
        finally {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
                    <p className="text-brandHeaderColor text-lg">Tartalom betöltése...</p>
                </div>
            </div>
        );
    }

    return (
        <section id="contentPage" className="pt-20 mb-12 in-h-screen bg-gradient-to-b from-brand to-white mx-auto w-full ">
            <article className="section-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <header className="mb-8 leading-loose">
                    <h1 className=" border-l-4 border-brandButton pl-4 text-4xl md:text-5xl lg:text-6xl font-bold text-brandHeaderColor">
                        {pageContent?.title.rendered}
                    </h1>
                </header>

                <section className="text-gray-700 leading-normal mt-8"
                    dangerouslySetInnerHTML={{ __html: pageContent?.content.rendered ?? "" }} />

            </article>
        </section>
    );
}