import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/a11y";

import { useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import useListActions from "~/utils/useListActions";
import useWindowSize, {
  convertWindowSizeToCardsPerRow,
} from "~/utils/useWindowSize";

import { Swiper, SwiperSlide } from "swiper/react";
import MediaCard from "~/components/MediaCard";
import DestructiveModal from "./Modals/DestructiveModal";

import type { APIResult, DeleteMediaProps, MongoListItem } from "~/utils/types";
import type { WithId } from "mongodb";

export default function MediaRow({
  title,
  apiResult,
  bgColor,
  listItems,
}: {
  title: string;
  apiResult?: APIResult[];
  bgColor?: string;
  listItems?: WithId<MongoListItem>[];
}) {
  const size = useWindowSize();
  const [confirmDeletion, setConfirmDeletion] = useState(false);
  const [mediaToDeleteId, setMediaToDeleteId] = useState<string | null>(null);
  const [mediaTitle, setMediaTitle] = useState<string | null>(null);
  const { removeFromList } = useListActions();

  const deleteMedia: DeleteMediaProps = {
    setConfirmDeletion,
    setMediaToDeleteId,
    setMediaTitle,
  };

  if (!apiResult && !listItems) return null;

  if (size.width === undefined) return null;

  return (
    <div className={`p-4 py-6 ${bgColor}`}>
      <h2 className="pb-4 text-xl font-bold tracking-wider">{title}</h2>
      <div>
        <DestructiveModal
          open={confirmDeletion}
          onClose={() => setConfirmDeletion(false)}
          onConfirmation={() => {
            if (mediaToDeleteId) {
              removeFromList(mediaToDeleteId);
            }
            setConfirmDeletion(false);
          }}
          mediaTitle={mediaTitle ?? "Something went wrong"}
        />
        <Swiper
          className="w-full"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          slidesPerView={convertWindowSizeToCardsPerRow(size)}
          centeredSlidesBounds={true}
        >
          {apiResult?.map((mediaFromApi) => {
            const item = listItems?.find(
              (item) => item?.media.id === mediaFromApi.id,
            );
            return (
              <SwiperSlide key={mediaFromApi.id}>
                <MediaCard
                  mediaFromApi={mediaFromApi}
                  item={item}
                  deleteMedia={deleteMedia}
                  inMediaRow
                />
              </SwiperSlide>
            );
          })}
          {listItems &&
            !apiResult &&
            listItems.map((item) => {
              if (item)
                return (
                  <SwiperSlide key={item.media.id}>
                    <MediaCard item={item} deleteMedia={deleteMedia} />
                  </SwiperSlide>
                );
            })}
        </Swiper>
      </div>
    </div>
  );
}
