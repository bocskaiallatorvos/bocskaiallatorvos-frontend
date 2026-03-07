import { useState, useEffect } from 'react';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { WPGallery, WPGalleryImageDetail } from '../../interfaces/WordpressInterfaces';
import { useCms } from '../../context/CmsContext';


interface GalleryDetailProps {
    group: WPGallery;
    onBack: () => void;
}

export default function GalleryDetail({ group, onBack }: GalleryDetailProps) {
    const {gallery, error} = useCms();
    const [images, setImages] = useState<WPGalleryImageDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<WPGalleryImageDetail | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);

    useEffect(() => {
        fetchImages();
    }, [group.id]);

    const fetchImages = async () => {
        setLoading(true);

        if (error) return <p>Hiba: {error}</p>;
        const data = gallery.filter(item => item.id === group.id)[0];

        if (!error && data) {
          setImages(data.images ?? []);
        }
        setLoading(false);
    };

    const handleImageClick = (image: WPGalleryImageDetail, index: number) => {
        setSelectedImage(image);
        setSelectedImageIndex(index);
    };

    const goToPreviousImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex > 0) {
            const newIndex = selectedImageIndex - 1;
            setSelectedImage(images[newIndex]);
            setSelectedImageIndex(newIndex);
        }
    };

    const goToNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImageIndex < images.length - 1) {
            const newIndex = selectedImageIndex + 1;
            setSelectedImage(images[newIndex]);
            setSelectedImageIndex(newIndex);
        }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (!selectedImage) return;
        if (e.key === 'ArrowLeft') {
            if (selectedImageIndex > 0) {
                const newIndex = selectedImageIndex - 1;
                setSelectedImage(images[newIndex]);
                setSelectedImageIndex(newIndex);
            }
        } else if (e.key === 'ArrowRight') {
            if (selectedImageIndex < images.length - 1) {
                const newIndex = selectedImageIndex + 1;
                setSelectedImage(images[newIndex]);
                setSelectedImageIndex(newIndex);
            }
        } else if (e.key === 'Escape') {
            setSelectedImage(null);
        }
    };

    useEffect(() => {
        if (selectedImage) {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown);
        }
    }, [selectedImage, selectedImageIndex, images]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="max-w-7xl mx-auto px-4 py-16">
                <button
                    onClick={onBack}
                    className="flex mt-10 items-center text-brandButton hover:text-brandButtonHover mb-8 group transition-all duration-300 transform hover:translate-x-[-4px]"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:translate-x-[-4px]" />
                    <span className="font-semibold">Vissza a galériákhoz</span>
                </button>

                <div className="mb-12 animate-fade-in">
                    <h1 className="text-5xl font-bold text-brandHeaderColor mb-3">
                        {group.name}
                    </h1>
                    <p className="text-xl text-slate-600">
                        {/*group.description*/}
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-900"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {images.map((image, index) => (
                            <div
                                key={image.id}
                                className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-zoom-in"
                                style={{ animationDelay: `${index * 50}ms` }}
                                onClick={() => handleImageClick(image, index)}
                            >
                                <div className="aspect-square overflow-hidden bg-slate-200">
                                    <img
                                        src={image.src}
                                        alt={image.title}
                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                                    />
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <h3 className="text-lg font-bold">{image.title}</h3>
                                        {image.description && (
                                            <p className="text-sm text-slate-200 mt-1">{image.description}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in-fast"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white hover:text-slate-300 transition-colors duration-200 p-2 hover:rotate-90 transform transition-transform duration-300"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="w-8 h-8" />
                    </button>

                    <button
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full transition-all duration-300 ${selectedImageIndex > 0
                                ? 'opacity-100 hover:bg-white/20 cursor-pointer'
                                : 'opacity-30 cursor-not-allowed'
                            }`}
                        onClick={goToPreviousImage}
                        disabled={selectedImageIndex === 0}
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>

                    <div
                        className="max-w-6xl max-h-[90vh] animate-scale-in flex flex-col items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                        />
                        {(selectedImage.title || selectedImage.description) && (
                            <div className="mt-4 text-center text-white">
                                {selectedImage.title && (
                                    <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                                )}
                                {selectedImage.description && (
                                    <p className="text-slate-300">{selectedImage.description}</p>
                                )}
                                <p className="text-sm text-slate-400 mt-3">
                                    {selectedImageIndex + 1} / {images.length}
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full transition-all duration-300 ${selectedImageIndex < images.length - 1
                                ? 'opacity-100 hover:bg-white/20 cursor-pointer'
                                : 'opacity-30 cursor-not-allowed'
                            }`}
                        onClick={goToNextImage}
                        disabled={selectedImageIndex === images.length - 1}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </div>
            )}
        </div>
    );
}
