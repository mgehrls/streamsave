// import { useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import type { Media, MongoListItem, MongoMedia } from "~/utils/types";
import Loading from "./Loading";
import Image from "next/image";
import Link from "next/link";
import TagPill from "./TagPill";
import useListActions from "~/utils/useListActions";
import { imageFromAPIBasePath } from "~/utils/constants";
import { genresFromAPI } from "~/utils/genres";
import { useState } from "react";
import type { WithId } from "mongodb";

export default function MediaCard({
  media,
  item,
}: {
  media?: Media;
  item?: WithId<MongoListItem>;
}) {
  const [confirmRemoval, setConfirmRemoval] = useState(false);
  const {
    addFavToList,
    addWatchLaterToList,
    removeFromList,
    changeWatchLaterValue,
    addingFav,
    addingWatchLater,
    removing,
    updating,
  } = useListActions();

  if (!media && !item) return null;

  let tagsToDisplay: { id: number; name: string }[] = [];
  let objectToSend: {
    media: MongoMedia;
  };

  if (media) {
    objectToSend = {
      media: {
        id: media.id,
        title: media.title,
        type: media.type,
        poster: media.poster,
        backdrop: media.backdrop,
        description: media.description,
        watchLater: false,
        tags: [],
      },
    };
  } else {
    objectToSend = {
      media: {
        id: item!.media.id,
        title: item!.media.title,
        type: item!.media.type,
        poster: item!.media.poster,
        backdrop: item!.media.backdrop,
        description: item!.media.description,
        watchLater: item!.media.watchLater,
        tags: [],
      },
    };
  }

  if (item?.media.tags) {
    objectToSend.media.tags = item.media.tags;
    tagsToDisplay = item.media.tags;
  } else if (media?.genres) {
    objectToSend.media.tags = media.genres.map((genre) => {
      return {
        id: genre,
        name: genresFromAPI.find((tag) => tag.id === genre)?.name ?? "",
      };
    });
    tagsToDisplay = media.genres.map((genre) => {
      const tag = genresFromAPI.find((tag) => tag.id === genre);
      if (tag) {
        return tag;
      } else {
        return { id: 0, name: "" };
      }
    });
  } else {
    objectToSend.media.tags = [];
  }

  const likeBtnClasses =
    "absolute right-0 top-0 rounded-bl-lg bg-black p-2 text-white opacity-70 hover:opacity-100";
  const watchLaterBtnClasses =
    "absolute left-0 top-0 rounded-br-lg bg-black p-2 text-white opacity-70 hover:opacity-100";
  const iconSize = 20;

  return (
    <div className="relative mx-auto min-w-[160px] max-w-[160px] bg-zinc-900 p-2">
      {confirmRemoval && item?.media.id && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-8 bg-black p-2 text-white">
          <p className="font-bold">Remove from List?</p>
          {!removing && (
            <button
              aria-label={`Confirm removal of ${item.media.title}.`}
              onClick={() => {
                removeFromList(item._id as string);
              }}
            >
              Remove
            </button>
          )}
          {removing && (
            <div>
              <Loading />
            </div>
          )}

          <button
            aria-label={`Cancel deletion. Keep ${item.media.title}.`}
            onClick={() => setConfirmRemoval(false)}
          >
            Close
          </button>
        </div>
      )}

      {item && !item.media.watchLater && (
        <button
          aria-label={`Delete ${item.media.title}. Requires confirmation.`}
          onClick={() => setConfirmRemoval(true)}
          className={likeBtnClasses}
        >
          <FaHeart size={iconSize} fill="red" />
        </button>
      )}
      {item && item.media.watchLater && (
        <>
          <button
            aria-label={`Delete ${item.media.title}. Requires confirmation.`}
            onClick={() => setConfirmRemoval(true)}
            className={watchLaterBtnClasses}
          >
            <FaStar size={iconSize} fill="green" />
          </button>
          {!updating && (
            <button
              aria-label={`Change ${item.media.title} from something you want to watch later to a favorite of yours.`}
              onClick={() =>
                changeWatchLaterValue({
                  id: item._id as string,
                  watchLater: false,
                  lastSeen: "",
                })
              }
              className={likeBtnClasses}
            >
              <FaRegHeart size={iconSize} color="white" />
            </button>
          )}
          {updating && (
            <div className={likeBtnClasses}>
              <Loading />
            </div>
          )}
        </>
      )}
      {!item && (
        <>
          {!addingWatchLater && (
            <button
              aria-label={`Add ${objectToSend.media.title} to your watch later list.`}
              onClick={() => {
                objectToSend.media.watchLater = true;
                addWatchLaterToList(objectToSend);
                setConfirmRemoval(false);
              }}
              className={watchLaterBtnClasses}
            >
              <FaClockRotateLeft size={iconSize} />
            </button>
          )}
          {addingWatchLater && (
            <div className={watchLaterBtnClasses}>
              <Loading />
            </div>
          )}
          {!addingFav && (
            <button
              aria-label={`Add ${objectToSend.media.title} to your favorites list.`}
              onClick={() => {
                addFavToList(objectToSend);
                setConfirmRemoval(false);
              }}
              className={likeBtnClasses}
            >
              <FaRegHeart size={iconSize} color="white" />
            </button>
          )}
          {addingFav && (
            <div className={likeBtnClasses}>
              <Loading />
            </div>
          )}
        </>
      )}

      <Link
        aria-label={`Go to ${objectToSend.media.title}'s page.`}
        href={`/media/${objectToSend.media.type}/${objectToSend.media.id}`}
      >
        <div className="flex h-52 w-36 items-center bg-black">
          <Image
            src={
              objectToSend.media.poster
                ? `${imageFromAPIBasePath}${objectToSend.media.poster}`
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
              {objectToSend.media.title}
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
  );
}
