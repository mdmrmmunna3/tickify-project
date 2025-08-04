import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay } from "swiper/modules";

const images = [
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/event_category/opening-ceremony.png",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/event_category/creative-team.png",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/event_category/singer.png",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/event_category/reunion.png",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/event_category/creative-team.png",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/event_category/exhibition.png",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/event_category/soccer-player.png",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/event_category/mirror-ball.png",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/event_category/competition.png",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/event_category/singer.png",
];

const SlideCategory = () => {
    return (
        <div className='pt-10 lg:px-[85px] md:px-8 px-4'>
            <div className="mb-10">
                <Swiper
                    spaceBetween={10}
                    // slidesPerView={4}
                    loop={true}
                    speed={3000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 4,
                        },
                        768: {
                            slidesPerView: 6,
                        },
                        1024: {
                            slidesPerView: 9,
                        },
                    }}
                    modules={[Autoplay]}
                    className=" rounded-md overflow-hidden"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className='flex justify-center items-center'>
                                <img
                                    src={img}
                                    alt={`Slide ${index + 1}`}
                                    className="w-[50px] rounded-md "
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default SlideCategory;