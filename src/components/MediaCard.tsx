import { useState } from "react";
import { FaHeart, FaRegHeart, FaPlus } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { api } from "~/utils/api";
import type { ListItemPlusMedia, Media } from "~/utils/types";
import Loading from "./Loading";
import Image from "next/image";

export default function MediaCard({
  media,
  item,
  allTags,
}: {
  media: Media;
  item?: ListItemPlusMedia;
  allTags: { tags: { id: number; name: string }[] };
}) {
  const ctx = api.useUtils();
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
      tags: number[];
    };
  } = {
    media: {
      ...media,
      watchLater: item?.watchLater ?? false,
      tags: [],
    },
  };
  if (item?.tags) {
    objectToSend.media.tags = item.tags.map((tag) => tag.id);
    tagsToDisplay = item.tags;
  } else if (media.genres) {
    objectToSend.media.tags = media.genres;
    tagsToDisplay = media.genres.map((genre) => {
      const tag = allTags.tags.find((tag) => tag.id === genre);
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
  const basePath = "https://image.tmdb.org/t/p/w500";

  const [confirmRemoval, setConfirmRemoval] = useState(false);

  const { mutate: addFavToList, isLoading: addingFav } =
    api.listItem.addListItem.useMutation({
      onSuccess: () => {
        //invalidate the cache, void tells typescript that we don't care to await the promise. It can happen in the background.
        void ctx.listItem.getUserList.invalidate();
      },
    });
  const { mutate: addWatchLaterToList, isLoading: addingWatchLater } =
    api.listItem.addListItem.useMutation({
      onSuccess: () => {
        //invalidate the cache, void tells typescript that we don't care to await the promise. It can happen in the background.
        void ctx.listItem.getUserList.invalidate();
      },
    });

  const { mutate: removeFromList, isLoading: removing } =
    api.listItem.deleteListItem.useMutation({
      onSuccess: () => {
        void ctx.listItem.getUserList.invalidate();
      },
    });

  const { mutate: updateListItem, isLoading: updating } =
    api.listItem.updateListItem.useMutation({
      onSuccess: () => {
        void ctx.listItem.getUserList.invalidate();
      },
    });

  return (
    <div className="relative mx-auto min-w-[160px] max-w-[160px] bg-zinc-900 p-2 lg:min-w-[194px] lg:max-w-[194px]">
      {confirmRemoval && item?.id && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center gap-8 bg-black p-2 text-white">
          <p className="font-bold">Remove from List?</p>
          {!removing && (
            <button onClick={() => removeFromList({ id: item.id })}>
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

      {item && !item.watchLater && (
        <button
          onClick={() => setConfirmRemoval(true)}
          className={likeBtnClasses}
        >
          <FaHeart size={iconSize} fill="red" />
        </button>
      )}
      {item && item.watchLater && (
        <>
          <button
            onClick={() => setConfirmRemoval(true)}
            className={watchLaterBtnClasses}
          >
            <FaClockRotateLeft size={iconSize} fill="green" />
          </button>
          {!updating && (
            <button
              onClick={() =>
                updateListItem({
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
          )}
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

      <div className="flex h-52 w-36 items-center bg-black lg:h-[264px] lg:w-44">
        <Image
          src={`${basePath}${media.poster}`}
          alt=""
          width={176}
          height={264}
          className="object-scale-down"
        />
      </div>
      <div className="p-1">
        <div className="mt-1 flex h-[40px] items-center">
          <h3 className="text-md line-clamp-2 leading-[19px] lg:text-lg">
            {media.title}
          </h3>
        </div>
        <div className="flex max-h-[52px] min-h-[52px] flex-wrap items-start gap-x-2 gap-y-1 pt-2">
          {tagsToDisplay.map((genre) => {
            return (
              <span
                key={genre.id}
                className="rounded-md bg-slate-800 px-1 py-0.5 text-xs tracking-wider"
              >
                {genre.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
