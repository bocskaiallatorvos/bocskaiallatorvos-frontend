import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import GalleryDetail from './GalleryDetail';
import { useCms } from '../../context/CmsContext';
import { WPGallery } from '../../interfaces/WordpressInterfaces';

export default function Gallery() {
    const [groups, setGroups] = useState<WPGallery[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const {gallery, error} = useCms();

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        setLoading(true);

        if (!error && gallery) {
            setGroups(gallery);
        }
        setLoading(false);
    };

    if (selectedGroupId) {
        const selectedGroup = groups.find(g => g.id === selectedGroupId);

        return (
            <GalleryDetail
                group={selectedGroup!}
                onBack={() => setSelectedGroupId(null)}
            />
        );
    }

    return (
        <div className="py-20 min-h-screen bg-gradient-to-br from-brand to-white">
            <div className="container max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-4xl font-bold text-brandHeaderColor mb-3 flex items-center justify-center gap-3">
                        Galéria
                    </h1>
                    <p className="text-brandColor text-xl sm:text-2xl">
                        Pillantson be rendelőnk mindennapjaiba! 
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-900"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {groups.map((group, index) => (
                            <div
                                key={group.id}
                                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                                onClick={() => setSelectedGroupId(group.id)}
                            >
                                <div className="aspect-[4/3] overflow-hidden">
                                    <img
                                        src={group.main_image}
                                        alt={group.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300 group-hover:translate-y-0">
                                    <h3 className="text-3xl font-bold mb-2 group-hover:text-brandButtonHover transition-colors duration-300">
                                        {group.name}
                                    </h3>
                                    <p className="text-slate-200 mb-4 opacity-90">
                                        {/*group.description*/}
                                    </p>
                                    <div className="flex items-center text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                                        <span className="mr-2">Megnyitás</span>
                                        <ArrowRight className="w-5 h-5 animate-bounce-x" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
