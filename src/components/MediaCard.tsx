import type { APIResult, DeleteMediaProps, MongoListItem } from "~/utils/types";
import Image from "next/image";
import Link from "next/link";
import TagPill from "./TagPill";
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
  const tagsToDisplay = item?.media.tags ?? media.tags;

  const likeBtnClasses =
    "absolute right-0 top-0 rounded-bl-lg bg-black p-2 text-white opacity-70 hover:opacity-100";
  const watchLaterBtnClasses =
    "absolute left-0 top-0 rounded-br-lg bg-black p-2 text-white opacity-70 hover:opacity-100";

  return (
    <>
      <div className="relative mx-auto min-w-[160px] max-w-[160px] bg-zinc-900 p-2">
        <div className={likeBtnClasses}>
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
        <div className={watchLaterBtnClasses}>
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
        <Link
          aria-label={`Go to ${media.title}'s page.`}
          href={`/media/${media.type}/${media.id}`}
        >
          <div className="flex h-52 w-36 items-center bg-black">
            <Image
              src={
                media.poster
                  ? `${imageFromAPIBasePath}${media.poster}`
                  : "/images/posterUnavailable.png"
              }
              alt=""
              width={176}
              height={264}
              className="object-scale-down"
            />
          </div>
          <div className="p-1">
            <div className="mt-1 flex h-[40px] items-center">
              <h3 className="text-md line-clamp-2 leading-[19px]">
                {media.title}
              </h3>
            </div>
            <div className="flex max-h-[52px] min-h-[52px] flex-wrap items-start gap-x-[2px] gap-y-1 overflow-hidden pt-2">
              {tagsToDisplay.map((genre) => {
                return <TagPill key={genre.id} tag={genre} />;
              })}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
