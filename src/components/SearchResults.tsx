import Image from "next/image";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import { FaRegHeart, FaStar, FaHeart } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { api } from "~/utils/api";
import type { APIResult, MongoMedia } from "~/utils/types";
import Loading from "./Loading";
import useListActions from "~/utils/useListActions";
import { imageFromAPIBasePath } from "~/utils/constants";
import { ApiMediaToListItem } from "~/utils/ApiToListItem";

export default function SearchResults({
  searchQuery,
  setSearchQuery,
  setShowSearch,
}: {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
}) {
  const { data, isLoading, isError } = api.mDB.search.useQuery({
    query: searchQuery,
  });
  const {
    data: listData,
    isLoading: listLoading,
    isError: listDataError,
  } = api.listItem.getUserList.useQuery();

  if (isLoading || listLoading)
    return (
      <div className="bg-black px-20 py-8">
        <Loading />
      </div>
    );
  if (isError)
    return <div>An error occurred when searching for your request</div>;
  if (listDataError)
    return <div>An error occurred when searching for your list</div>;
  if (!data) return <div>No data</div>;
  if (!listData) return <div>No list data</div>;
  if (searchQuery === "") {
    setShowSearch(false);
  }

  const filteredData = data.filter(
    (item: APIResult) => item.media_type !== "person",
  );

  function resetSearch() {
    setSearchQuery("");
    setShowSearch(false);
  }

  return (
    <div className="z-40 flex w-full max-w-4xl flex-col gap-6 overflow-x-hidden border-2 border-white bg-black p-4">
      <div className="flex w-full gap-2">
        <h2 className="text-xl">{`Search results for "${searchQuery}"`}</h2>
        <button
          aria-label="Close search results"
          className="text-md border-[1px] px-2 text-white"
          onClick={() => resetSearch()}
        >
          X
        </button>
      </div>
      {!filteredData[0] && (
        <div className="flex w-full items-center justify-center bg-slate-600 p-8">
          <p className="text-xl">No results found</p>
        </div>
      )}
      {filteredData.map((mediaFromApi: APIResult) => {
        const listItem = listData.find(
          (item) => item.media.id == mediaFromApi.id,
        );
        const dbId = listItem?._id ? (listItem._id as string) : undefined;
        const isWatchLater = listItem?.media.watchLater ? true : false;
        const media = ApiMediaToListItem(mediaFromApi);

        return (
          <div
            className="flex w-full justify-between bg-slate-600"
            key={media.id}
          >
            <ImageSection media={media} resetSearch={resetSearch} />
            <div className="flex w-[60%] flex-col justify-center gap-2 p-2 lg:w-1/2 lg:p-8">
              <h3 className="font-bold lg:w-[28ch] lg:text-lg">
                {media.title.length > 40
                  ? media.title.slice(0, 39)
                  : media.title}
              </h3>
              <p className="lg:text-md wrap line-clamp-2 text-sm">
                {media.description?.slice(0, 100) + "..."}
              </p>
              <Buttons
                listItemId={dbId}
                isWatchLater={isWatchLater}
                media={media}
              />
            </div>
          </div>
        );
      })}
      {filteredData.length !== 0 && (
        <div className="flex justify-between px-8">
          <p className="py-8 text-xl font-bold">End of results</p>
          <button
            aria-label="Close search results"
            onClick={() => resetSearch()}
            className="py-8 text-xl font-bold text-white"
          >
            X
          </button>
        </div>
      )}
    </div>
  );
}

const ImageSection = ({
  media,
  resetSearch,
}: {
  media: MongoMedia;
  resetSearch: () => void;
}) => {
  return (
    <div
      className="flex w-[40%] justify-center lg:w-1/2"
      style={{
        backgroundImage: `url(${imageFromAPIBasePath}${media.backdrop})`,
        backgroundSize: "cover",
      }}
    >
      <div className="flex w-full items-center justify-center bg-black lg:bg-opacity-50">
        <Link
          aria-label={`Go to ${media.title}'s page`}
          href={`/media/${media.type}/${media.id}`}
        >
          <div className="max-h-[212px]">
            <Image
              alt={`${media.title} poster`}
              src={
                media.poster
                  ? `${imageFromAPIBasePath}${media.poster}`
                  : "/images/posterUnavailable.png"
              }
              width={150}
              height={300}
              className="border-x-[6px] border-y-2 border-black opacity-100"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

const Buttons = ({
  listItemId,
  isWatchLater,
  media,
}: {
  listItemId: string | undefined;
  isWatchLater: boolean;
  media: MongoMedia;
}) => {
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

  return (
    <div className="flex items-end gap-2 sm:pt-4">
      {listItemId ? (
        isWatchLater ? (
          <>
            {!updating && (
              <button
                onClick={() =>
                  changeWatchLaterValue({
                    id: listItemId,
                    watchLater: false,
                    lastSeen: "",
                  })
                }
                className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold"
              >
                <FaRegHeart size={20} />
                <span className="hidden lg:block">Favorited</span>
              </button>
            )}
            {updating && (
              <div className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold">
                <Loading />
              </div>
            )}
            {!removing && (
              <button
                onClick={() => removeFromList(listItemId)}
                className="flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold"
              >
                <FaStar fill="green" size={20} />
                <span className="hidden lg:block">Interested</span>
              </button>
            )}
            {removing && (
              <div className="flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold">
                <Loading />
              </div>
            )}
          </>
        ) : (
          //in list, not watch later
          <>
            {!removing && (
              <button
                onClick={() => removeFromList(listItemId)}
                className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold"
              >
                <FaHeart fill="red" size={20} />
                <span>Favorited</span>
              </button>
            )}
            {removing && (
              <div className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold">
                <Loading />
              </div>
            )}
          </>
        )
      ) : (
        // not in list
        <div className="flex w-full items-center justify-between gap-2 md:items-end md:justify-start">
          {!addingFav && (
            <button
              onClick={() => addFavToList({ media: media })}
              className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold"
            >
              <FaRegHeart size={20} />
              <span className="hidden lg:block">Favorited</span>
            </button>
          )}
          {addingFav && (
            <div className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold">
              <Loading />
            </div>
          )}
          {!addingWatchLater && (
            <button
              onClick={() => {
                media.watchLater = true;
                console.log("media", media);
                addWatchLaterToList({ media: media });
              }}
              className="line-clamp-1 flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold"
            >
              <FaClockRotateLeft size={20} />
              <span className="hidden lg:block">Later</span>
            </button>
          )}
          {addingWatchLater && (
            <div className="flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold">
              <Loading />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
