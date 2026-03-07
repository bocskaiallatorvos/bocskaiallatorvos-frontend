import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useCms } from "../context/CmsContext";

const PartnersSlider = () => {
    const { partners, error } = useCms();

    if (error) return <p>Hiba: {error}</p>;



    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 max-w-screen-xl text-center">
                <h2 className="text-4xl font-extrabold text-brandHeaderColor mb-12 tracking-tight">
                    Partnereink
                </h2>

                <Swiper
                    modules={[Autoplay]}
                    slidesPerView={2}
                    spaceBetween={24}
                    autoplay={{ delay: 2500, disableOnInteraction: false }}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        1024: { slidesPerView: 5 },
                    }}
                    loop={partners.length > 5}
                >
                    {partners.map((partner, index) => (
                        <SwiperSlide key={index} className="pb-2">
                            <a
                                href={partner.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group block w-full bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-brand/40 p-5 flex flex-col items-center justify-between min-h-48"
                            >
                                <div className="flex items-center justify-center h-24 w-full overflow-hidden rounded-xl">
                                    <img
                                        src={partner.image}
                                        alt={partner.name}
                                        className="h-16 object-contain transform transition-transform duration-500 group-hover:scale-110 group-hover:grayscale-0 grayscale"
                                    />
                                </div>
                                <p className="mt-3 text-sm font-semibold text-gray-700 group-hover:text-brandButton transition-colors duration-300">
                                    {partner.name}
                                </p>
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>

    );
};

export default PartnersSlider;