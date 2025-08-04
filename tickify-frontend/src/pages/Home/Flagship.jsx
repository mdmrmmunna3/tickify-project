import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay } from "swiper/modules";

const images = [
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/site/gallery_images/lv-web-banner_JHksqRU.webp",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/site/gallery_images/anuv-cover_DnKaJxV.jpg",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/site/gallery_images/banner1_5MHGZhs.jpeg",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/site/gallery_images/1000x523.jpg",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/site/gallery_images/GP-Updated-1000x523-Cover-Master-Collage-tickify.jpg",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/site/gallery_images/rsz_darshan-event-banner-004-min.png",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/site/gallery_images/Ticket-1200X630-Final.webp",
    "https://floral-mountain-2867.fly.storage.tigris.dev/media/site/gallery_images/Artboard_22x-100.jpg",
];

const Flagship = () => {
    return (
        <div className='pt-10 lg:px-[85px] md:px-8 px-4'>
            <div className='text-center mb-10'>
                <h2 className=" text-3xl video_text font-semibold"> Flagship Events in Review: Made Easy with Tickify Ticketing</h2>
                <p className='text-center descrip text-xs mt-2'>We're proud to showcase the success of our previous flagship events, where Tickify provided exceptional ticketing solutions from start to finish.</p>
            </div>

            {/* left to right scrolling swiper  */}
            <div className="mb-10">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    loop={true}
                    speed={5000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    modules={[Autoplay]}
                    className=" rounded-md overflow-hidden"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="w-full rounded-md "
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* right to left scrolling swiper  */}
            <div dir="rtl">
                <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    loop={true}
                    speed={5000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    modules={[Autoplay]}
                    className=" rounded-md overflow-hidden"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="w-full rounded-md "
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Flagship;