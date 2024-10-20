import type { Media, MongoListItem } from "~/utils/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import useWindowSize from "~/utils/useWindowSize";
import MediaCard from "~/components/MediaCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/a11y";
import type { WithId } from "mongodb";

export default function MediaRow({
  title,
  media,
  bgColor,
  listItems,
}: {
  title: string;
  media?: Media[];
  bgColor?: string;
  listItems?: WithId<MongoListItem>[];
}) {
  const size = useWindowSize();

  if (!media && !listItems) return null;

  const slidesPerView =
    size.width && size.width < 440
      ? 2
      : size.width && size.width < 510
      ? 2.5
      : size.width && size.width < 595
      ? 3
      : size.width && size.width < 680
      ? 3.5
      : size.width && size.width < 760
      ? 4
      : size.width && size.width < 870
      ? 4.5
      : 5;

  return (
    <div className={`p-4 py-6 ${bgColor}`}>
      <h2 className="pb-4 text-xl font-bold tracking-wider">{title}</h2>
      <div>
        <Swiper
          className="w-full"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={slidesPerView}
          spaceBetween={10}
          loop={true}
          navigation={true}
          centeredSlidesBounds={true}
        >
          {media?.map((media) => {
            const item = listItems?.find((item) => item?.media.id === media.id);
            return (
              <SwiperSlide key={media.id}>
                <MediaCard media={media} item={item} />
              </SwiperSlide>
            );
          })}
          {listItems &&
            !media &&
            listItems.map((item) => {
              if (item)
                return (
                  <SwiperSlide key={item.media.id}>
                    <MediaCard item={item} />
                  </SwiperSlide>
                );
            })}
        </Swiper>
      </div>
    </div>
  );
}
