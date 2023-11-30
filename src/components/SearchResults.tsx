import Image from "next/image";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import { FaRegHeart, FaStar, FaHeart } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { api } from "~/utils/api";
import type { APIResult, ListItemPlusMedia } from "~/utils/types";
import Loading from "./Loading";
import useListActions from "~/utils/useListActions";

export default function SearchResults({
  searchQuery,
  listItems,
  // allTags,
  setSearchQuery,
}: {
  searchQuery: string;
  listItems: ListItemPlusMedia[];
  allTags: { tags: { id: number; name: string }[] };
  setSearchQuery: Dispatch<SetStateAction<string>>;
}) {
  const { data, isLoading, isError } = api.mDB.search.useQuery({
    query: searchQuery,
  });
  const basePath = "https://image.tmdb.org/t/p/w500";
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!data) return <div>No data</div>;

  console.log(data);

  function resetSearch() {
    setSearchQuery("");
  }

  return (
    <div className="z-40 flex max-w-4xl flex-col gap-6 overflow-x-hidden bg-black p-4">
      <div className="flex gap-8">
        <h2 className="text-xl">{`Search results for "${searchQuery}"`}</h2>
        <button className="text-md border-[1px] px-2" onClick={resetSearch}>
          clear search X
        </button>
      </div>
      {data.map((media: APIResult) => {
        const listItem = listItems.find((item) => item.mediaId == media.id);
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
            id: media.id,
            type: media.name ? "tv" : "movie",
            title: media.name || media.title,
            poster: media.poster_path || "",
            backdrop: media.backdrop_path || "",
            description: media.overview,
            watchLater: false,
            tags: [],
          },
        };
        return (
          <div
            className="flex w-full justify-between bg-slate-600"
            key={media.id}
          >
            <div
              className="flex w-1/2 justify-center"
              style={{
                backgroundImage: `url(${basePath}${media.backdrop_path})`,
                backgroundSize: "cover",
              }}
            >
              <div className="flex w-full items-center justify-center bg-black bg-opacity-50">
                <Link
                  onClick={resetSearch}
                  href={`/media/${media.name ? "tv" : "movie"}/${media.id}`}
                >
                  <div className="max-h-[212px]">
                    <Image
                      alt={`${media.title || media.name} poster`}
                      src={
                        media.poster_path
                          ? `${basePath}${media.poster_path}`
                          : "/images/posterunavailable.png"
                      }
                      width={150}
                      height={300}
                      className="border-x-[6px] border-y-2 border-black opacity-100"
                    />
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex w-1/2 flex-col justify-center gap-2 p-8">
              <h3 className="w-[28ch] text-lg font-bold">
                {media.name || media.title}
              </h3>
              <p className="text-md wrap line-clamp-2">
                {media.overview.slice(0, 100) + "..."}
              </p>
              {/* buttons */}
              <div className="flex items-end gap-2 sm:pt-4">
                {listItem ? (
                  listItem.watchLater ? (
                    // in list, in watch later
                    <>
                      {!updating && (
                        <button
                          onClick={() =>
                            changeWatchLaterValue({
                              id: listItem.id,
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
                          onClick={() => removeFromList({ id: listItem.id })}
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
                          onClick={() => removeFromList({ id: listItem.id })}
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
                        onClick={() => addFavToList(objectToSend)}
                        className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold"
                      >
                        <FaRegHeart size={20} />
                        <span className="">Favorited</span>
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
                          objectToSend.media.watchLater = true;
                          addWatchLaterToList(objectToSend);
                        }}
                        className="line-clamp-1 flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold"
                      >
                        <FaClockRotateLeft size={20} />
                        <span>Later</span>
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
            </div>
          </div>
        );
      })}
      <div className="flex justify-between px-8">
        <p className="py-8 text-xl font-bold">End of results</p>
        <button onClick={resetSearch} className="py-8 text-xl font-bold">
          X
        </button>
      </div>
    </div>
  );
}
