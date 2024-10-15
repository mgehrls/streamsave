// import { useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import type { Media, MongoListItem } from "~/utils/types";
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
  media: Media;
  item?: WithId<MongoListItem>;
}) {
  let tagsToDisplay: { id: number; name: string }[] = [];

  const objectToSend: {
    media: {
      id: number;
      type: string;
      title: string;
      poster: string;
      backdrop: string;
      description: string;
      watchLater: boolean;
      tags: { id: number; name: string }[];
    };
  } = {
    media: {
      ...media,
      watchLater: item?.media.watchLater ?? false,
      tags: [],
    },
  };
  if (item?.media.tags) {
    objectToSend.media.tags = item.media.tags;
    tagsToDisplay = item.media.tags;
  } else if (media.genres) {
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

  const [confirmRemoval, setConfirmRemoval] = useState(false);
  const {
    addFavToList,
    addWatchLaterToList,
    removeFromList,
    //   changeWatchLaterValue,
    addingFav,
    addingWatchLater,
    removing,
    // updating,
  } = useListActions();

  return (
    <div className="relative mx-auto min-w-[160px] max-w-[160px] bg-zinc-900 p-2">
      {confirmRemoval && item?.media.id && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-8 bg-black p-2 text-white">
          <p className="font-bold">Remove from List?</p>
          {!removing && (
            <button
              onClick={() => {
                console.log("removing", typeof item._id);
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

          <button onClick={() => setConfirmRemoval(false)}>Close</button>
        </div>
      )}

      {item && !item.media.watchLater && (
        <button
          onClick={() => setConfirmRemoval(true)}
          className={likeBtnClasses}
        >
          <FaHeart size={iconSize} fill="red" />
        </button>
      )}
      {item && item.media.watchLater && (
        <>
          <button
            onClick={() => setConfirmRemoval(true)}
            className={watchLaterBtnClasses}
          >
            <FaStar size={iconSize} fill="green" />
          </button>
          {/* {!updating && (
            <button
              onClick={() =>
                changeWatchLaterValue({
                  id: item.id,
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
          )} */}
        </>
      )}
      {!item && (
        <>
          {!addingWatchLater && (
            <button
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

      <div className="flex h-52 w-36 items-center bg-black">
        <Link href={`/media/${media.type}/${media.id}`}>
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
        </Link>
      </div>
      <div className="p-1">
        <div className="mt-1 flex h-[40px] items-center">
          <Link href={`/media/${media.type}/${media.id}`}>
            <h3 className="text-md line-clamp-2 leading-[19px]">
              {media.title}
            </h3>
          </Link>
        </div>
        <div className="flex max-h-[52px] min-h-[52px] flex-wrap items-start gap-x-[2px] gap-y-1 overflow-hidden pt-2">
          {tagsToDisplay.map((genre) => {
            return <TagPill key={genre.id} tag={genre} />;
          })}
        </div>
      </div>
    </div>
  );
}
