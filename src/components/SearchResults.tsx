import Image from "next/image";
import Link from "next/link";
import { type Dispatch, type SetStateAction } from "react";
import { api } from "~/utils/api";
import type { APIResult } from "~/utils/types";
import Loading from "./Loading";
import { imageFromAPIBasePath } from "~/utils/constants";
import { SingleApiMediaToListItem, typeIsMovie } from "~/utils/ApiToListItem";
import SearchResultButtonSection from "./Buttons/SearchResultButtonSection";

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
      <div className="absolute left-0 top-20 z-40 mx-4 flex max-h-[300px] min-h-[100px] flex-col items-center justify-center gap-2 overflow-x-hidden overflow-y-scroll border-2 border-white/70 bg-[#15181c] md:mx-0 md:w-full lg:max-h-[600px]">
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

  // multi searching the api can return people, this filters them out.
  const filteredData = data.filter((item: APIResult) => {
    if (item.media_type !== "person") {
      return true;
    } else {
      return false;
    }
  });

  function resetSearch() {
    setSearchQuery("");
    setShowSearch(false);
  }

  return (
    <>
      <div
        onClick={() => resetSearch()}
        className="fixed left-0 top-0 z-20 h-screen w-screen bg-black/80 transition-none"
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute left-0 top-20 z-40 mx-4 flex max-h-[300px] flex-col gap-2 overflow-x-hidden overflow-y-scroll border-2 border-white/70 bg-[#15181c] md:mx-0 md:w-full lg:max-h-[600px]"
      >
        <div className="sticky top-0 flex w-full justify-between gap-2 bg-black/70 p-4">
          <h2 className="text-xl">{`Search results for "${searchQuery}"`}</h2>
          <button
            aria-label="Close search results"
            className="text-md border-[1px] px-2 text-white"
            onClick={() => resetSearch()}
          >
            X
          </button>
        </div>
        <div>
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
            const media = SingleApiMediaToListItem(mediaFromApi);

            return (
              <div
                className="flex w-full justify-between bg-slate-800"
                key={media.id}
              >
                <Link
                  className="flex w-1/3 justify-center py-2"
                  aria-label={`Go to ${media.title}'s page`}
                  href={`/media/${media.type}/${media.id}`}
                >
                  <Image
                    alt={`${media.title} poster`}
                    src={
                      media.poster
                        ? `${imageFromAPIBasePath}${media.poster}`
                        : "/images/posterUnavailable.png"
                    }
                    width={100}
                    height={200}
                  />
                </Link>
                <div className="flex w-2/3 flex-col justify-center gap-2 p-4">
                  <Link
                    aria-label={`Go to ${media.title}'s page`}
                    href={`/media/${media.type}/${media.id}`}
                  >
                    <h3 className="font-bold lg:w-[28ch] lg:text-lg">
                      {media.title.length > 40
                        ? media.title.slice(0, 39)
                        : media.title}
                    </h3>
                  </Link>
                  <p className="lg:text-md wrap line-clamp-2 text-sm">
                    {media.description?.slice(0, 100) + "..."}
                  </p>
                  <SearchResultButtonSection
                    listItemId={dbId}
                    isWatchLater={isWatchLater}
                    media={media}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
