import type { APIResult, DeleteMediaProps, MongoListItem } from "~/utils/types";
import Image from "next/image";
import Link from "next/link";
import useListActions from "~/utils/useListActions";
import { imageFromAPIBasePath } from "~/utils/constants";
import type { WithId } from "mongodb";
import FavoriteButton from "./Buttons/FavoriteButton";
import { SingleApiMediaToListItem } from "~/utils/ApiToListItem";
import WatchLaterButton from "./Buttons/WatchLaterButton";

export default function MediaCard({
  mediaFromApi,
  item,
  deleteMedia,
}: {
  mediaFromApi?: APIResult;
  item?: WithId<MongoListItem>;
  deleteMedia: DeleteMediaProps;
}) {
  const { addFavToList, addWatchLaterToList, changeWatchLaterValue } =
    useListActions();

  if (!mediaFromApi && !item) return null;
  // if there is no mediaFromAPI, item will alway be defined
  const media = mediaFromApi
    ? SingleApiMediaToListItem(mediaFromApi)
    : item!.media;
  const listItemId = item?._id ? (item._id as string) : undefined;

  return (
    <>
      <div className="relative mx-auto w-[180px] rounded-lg bg-zinc-900">
        <div className="absolute left-0 top-0 rounded-br-lg rounded-tl-lg bg-black px-2 pb-[2px] pt-2 text-white opacity-70 hover:opacity-100">
          <WatchLaterButton
            addWatchLater={() => {
              media.watchLater = true;
              addWatchLaterToList({ media: media });
            }}
            removeWatchLater={() => {
              if (listItemId) {
                deleteMedia.setMediaTitle(media.title);
                deleteMedia.setMediaToDeleteId(listItemId);
                deleteMedia.setConfirmDeletion(true);
              }
            }}
            listItemId={listItemId}
            isWatchLater={item?.media.watchLater ?? false}
            mediaTitle={media.title}
          />
        </div>
        <div className="absolute right-0 top-0 rounded-bl-lg rounded-tr-lg bg-black px-2 pb-[2px] pt-2 text-white opacity-70 hover:opacity-100">
          <FavoriteButton
            addFav={() => addFavToList({ media: media })}
            changeWatchLaterToFav={() => {
              if (item?._id)
                changeWatchLaterValue({
                  id: item._id as string,
                  watchLater: false,
                  lastSeen: "",
                });
            }}
            removeFav={() => {
              if (listItemId) {
                deleteMedia.setMediaTitle(media.title);
                deleteMedia.setMediaToDeleteId(listItemId);
                deleteMedia.setConfirmDeletion(true);
              }
            }}
            listItemId={listItemId}
            isWatchLater={item?.media.watchLater ?? false}
            mediaTitle={media.title}
          />
        </div>
        <Link
          aria-label={`Go to ${media.title}'s page.`}
          href={`/media/${media.type}/${media.id}`}
        >
          <div className="flex h-[270px] w-[180px] items-center rounded-lg bg-black">
            <Image
              src={
                media.poster
                  ? `${imageFromAPIBasePath}${media.poster}`
                  : "/images/posterUnavailable.png"
              }
              alt=""
              width={180}
              height={270}
              className="rounded-lg object-cover"
            />
          </div>
        </Link>
      </div>
    </>
  );
}
