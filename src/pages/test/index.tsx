import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Test() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      slidesPerView={3}
      spaceBetween={10}
      loop={true}
      pagination={{ clickable: true }}
      navigation={true}
    >
      <SwiperSlide className="h-6 bg-white">1</SwiperSlide>
      <SwiperSlide className="h-6 bg-white">2</SwiperSlide>
      <SwiperSlide className="h-6 bg-white">3</SwiperSlide>
      <SwiperSlide className="h-6 bg-white">4</SwiperSlide>
      <SwiperSlide className="h-6 bg-white">5</SwiperSlide>
      <SwiperSlide className="h-6 bg-white">6</SwiperSlide>
    </Swiper>
  );
}
