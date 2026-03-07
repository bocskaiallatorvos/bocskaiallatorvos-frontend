import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useCms } from '../../context/CmsContext';


export default function HeroHome() {

    const { pages, media, error } = useCms();

    //if (loading) return <p>Betöltés...</p>;
    if (error) return <p>Hiba: {error}</p>;

    const introductionPage = pages.find((p) => p.slug === "bemutatkozas");
    const welcomeImage = media.find((m) => m.slug === "bocskaiallatorvos-hero");

    return (
        <section id="hero" className="pt-24 pb-16 bg-gradient-to-br from-brand to-stone-50">
            <div className="container mx-auto px-4 pt-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <div className="inline-flex items-center bg-brandHero text-stlone-950 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <Heart className="w-4 h-4 mr-2" />
                            Professzionális állatorvosi ellátás
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-brandHeaderColor mb-6 leading-tight"
                            dangerouslySetInnerHTML={{ __html: introductionPage?.title.rendered || "" }} />

                        <p className="text-lg text-brandColor mb-8 max-w-xl"
                            dangerouslySetInnerHTML={{ __html: introductionPage?.content.rendered || "" }} />

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link
                                to="/kapcsolat"
                                className="bg-brandButton hover:bg-brandButtonHover text-brandColor hover:text-white px-8 py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl text-center"
                            >
                                Kapcsolat
                            </Link>
                            <Link
                                to="/szolgaltatasok"
                                className="bg-white hover:bg-lime-50 text-brandColor px-8 py-3 rounded-lg font-medium transition border-2 border-brandButton text-center"
                            >
                                Szolgáltatások
                            </Link>
                        </div>
                    </div>
                    <div className="flex-1">
                        {welcomeImage && <img className="rounded-2xl shadow-2xl w-full h-auto"
                            src={welcomeImage.guid.rendered} alt={welcomeImage.caption.rendered} />}
                    </div>
                </div>
            </div>
        </section>
    );
}
