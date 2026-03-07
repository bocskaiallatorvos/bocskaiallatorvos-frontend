import { Award, Clock, Users, Heart } from 'lucide-react';
import { useCms } from '../../context/CmsContext';


const stats = [
    { icon: Award, value: '15+', label: 'Év tapasztalat' },
    { icon: Users, value: '6000+', label: 'Elégedett ügyfél' },
    { icon: Heart, value: '12000+', label: 'Kezelt állat' },
    { icon: Clock, value: 'Heti 6 nap', label: 'Hosszú nyitvatartás' },
];



export default function AboutHome() {

    const { pages, media, error } = useCms();

    //if (loading) return <p>Betöltés...</p>;
    if (error) return <p>Hiba: {error}</p>;

    const aboutPages = pages.filter((p) => ["rolunk", "kepzett-orvosok"].includes(p.slug));
    const heroImage = media.find((m) => m.slug === "bocskaiallatorvos-udvozles");

    return (
        <section id="about" className="py-20 bg-gradient-to-br from-brand to-stone-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        {heroImage && <img className="rounded-2xl shadow-2xl w-full h-auto"
                            src={heroImage.guid.rendered} alt={heroImage.caption.rendered} />}
                    </div>
                    <div>
                        {aboutPages.map((page) => {
                            const replacedContent = page.content.rendered
                                .replace(/<p>/g, '<p class="text-base text-brandColor leading-relaxed mb-6">')
                            /*.replace(/<span>/g,'<span class="text-lg text-gray-800 mb-6">')*/;

                            return (
                                <div key={page.slug} className='mb-6'>
                                    <h2
                                        className="text-4xl font-bold text-brandHeaderColor mb-6"
                                        dangerouslySetInnerHTML={{ __html: page.title.rendered }}
                                    />
                                    <div
                                        dangerouslySetInnerHTML={{ __html: replacedContent }}
                                    />
                                </div>
                            );
                        })}

                        <div className="grid grid-cols-2 gap-6 mt-6 ">
                            {stats.map((stat, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                                    <div className="flex items-center gap-3 mb-3  flex-shrink-0">
                                        <stat.icon className="w-8 h-8 text-brandButton flex-shrink-0" />
                                        <div className="text-2xl font-bold text-brandHeaderColor">{stat.value}</div>
                                    </div>
                                    <div className="text-brandColor">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
