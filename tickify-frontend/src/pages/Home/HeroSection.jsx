import { Link } from "react-router-dom";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useRef } from "react";

const HeroSection = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <div className="max-w-screen-xl mx-auto py-3 lg:px-14 md:px-8 px-4 pt-28">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Carousel Section */}
                <div className="basis-[65%] relative overflow-hidden">
                    {/* Swiper with custom navigation */}
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        loop={true}
                        speed={800}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{ clickable: true }}
                        navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                        }}
                        onInit={(swiper) => {
                            // workaround for ref assignment
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="w-full h-[400px] rounded-md overflow-hidden"
                    >
                        {[
                            "https://floral-mountain-2867.fly.storage.tigris.dev/media/events/banner/01-02-ASCO.jpg",
                            "https://floral-mountain-2867.fly.storage.tigris.dev/media/events/thumbnails/GWEC_1000_x_1000_.png",
                            "https://floral-mountain-2867.fly.storage.tigris.dev/media/events/thumbnails/national-iq-3.jpeg",
                        ].map((img, index) => (
                            <SwiperSlide key={index}>
                                <img
                                    src={img}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-cover update"
                                />
                            </SwiperSlide>
                        ))}

                        {/* Custom navigation buttons */}
                        <button
                            ref={prevRef}
                            className="absolute left-2 top-1/2 z-20 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#1b4547] p-2 rounded-full shadow-lg transition"
                        >
                            <IoIosArrowBack size={24} />
                        </button>
                        <button
                            ref={nextRef}
                            className="absolute right-2 top-1/2 z-20 transform -translate-y-1/2 bg-white/80 hover:bg-white text-[#1b4547] p-2 rounded-full shadow-lg transition"
                        >
                            <IoIosArrowForward size={24} />
                        </button>
                    </Swiper>
                </div>

                {/* Video Overlay Section */}
                <div className="basis-[35%] relative overflow-hidden rounded-md">
                    <video
                        src="https://floral-mountain-2867.fly.storage.tigris.dev/static/frontend/video/home_ad.mp4"
                        className="h-[400px] w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    />
                    {/* Overlay Text */}
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4">
                        <h1 className="text-2xl lg:text-4xl font-bold text-white shadow-md">
                            Get Your Desired Event Pass!
                        </h1>
                        <Link
                            to=""
                            className="text-white mt-6 text-lg font-medium hover:bg-black rounded-md bg-[#1b4547] px-5 py-2 flex items-center justify-center gap-2"
                        >
                            Explore <MdOutlineDoubleArrow className="mt-1" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
