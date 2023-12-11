import LayoutWrapper from "~/components/LayoutWrapper";
import { api } from "~/utils/api";
import type { FullListItem } from "~/utils/types";
import { useState } from "react";
import { imageFromAPIBasePath } from "~/utils/constants";
import Image from "next/image";
import Link from "next/link";
import TagSection from "~/components/TagSection";

export default function List() {
  const { data: list } = api.listItem.getUserList.useQuery();
  const { data: allTags } = api.listItem.getAllTags.useQuery();
  //create filters, sort, and view state,
  const [filters, setFilters] = useState<{
    mediaType: string;
    tags: { id: number; name: string }[];
  }>({ mediaType: "all", tags: [] });
  const [sort, setSort] = useState<
    "alphaUp" | "alphaDown" | "dateAddedUp" | "dateAddedDown"
  >("alphaUp");
  //filter and sort the list up here
  //pass the filtered and sorted list to the different views

  if (!list || !allTags) return <div>Loading...</div>;

  console.log(list[0]);

  function isTagPresentInListItem(
    item: {
      media: {
        id: number;
        createdAt: Date;
        title: string;
        type: string;
        poster: string;
        backdrop: string;
        description: string;
      };
      tags: {
        id: number;
        name: string;
      }[];
    } & {
      id: string;
      createdAt: Date;
      lastSeen: string;
      userId: string;
      mediaId: number;
      watchLater: boolean;
    },
    filter: { mediaType: string; tags: { id: number; name: string }[] },
  ): boolean {
    const tagsInFilter = filter.tags.map((tag) => tag.name);
    const tagsInItem = item.tags.map((tag) => tag.name);

    const commonTags = tagsInFilter.some((tag) => tagsInItem.includes(tag));

    return commonTags;
  }

  const filteredList = list.filter((item) => {
    if (filters.mediaType === "all") {
      if (filters.tags.length === 0) return true;
      if (filters.tags.length !== 0) {
        return isTagPresentInListItem(item, filters);
      }
    } else if (filters.mediaType === "movie") {
      if (item.media.type === "movie") {
        if (filters.tags.length === 0) return true;
        if (filters.tags.length !== 0) {
          return isTagPresentInListItem(item, filters);
        }
      }
    } else if (filters.mediaType === "tv") {
      if (item.media.type === "tv") {
        if (filters.tags.length === 0) return true;
        if (filters.tags.length !== 0) {
          return isTagPresentInListItem(item, filters);
        }
      }
    }
  });

  const sortedList = filteredList.sort((a, b) => {
    if (sort === "alphaUp") {
      return a.media.title.localeCompare(b.media.title);
    } else {
      return b.media.title.localeCompare(a.media.title);
    }
  });
  const filterButtonClasses =
    "hover:bg-white px-4 py-2 rounded-md hover:text-black border-[1px] border-white transition-all";

  return (
    <LayoutWrapper>
      <div>
        <div className="flex items-center justify-between bg-sky-600 p-4">
          <h1 className="text-xl">Your List</h1>
          <label htmlFor="mediaFilter">Filter by Media</label>
          <select
            onChange={(e) =>
              setFilters({ mediaType: e.target.value, tags: filters.tags })
            }
            name="mediaFilter"
            className="text-black"
          >
            <option value={"all"}>All</option>
            <option value={"tv"}>TV</option>
            <option value={"movie"}>Movies</option>
          </select>
        </div>
        <div className="my-2 flex flex-col gap-2">
          {sortedList.map((item) => {
            return <ListView item={item} allTags={allTags} key={item.id} />;
          })}
        </div>
      </div>
    </LayoutWrapper>
  );
}

interface ListViewProps {
  item: FullListItem;
  allTags: { tags: { id: number; name: string }[] };
}

const ListView = ({ item, allTags }: ListViewProps) => {
  if (!item) return <div>Loading...</div>;

  return (
    <div className="flex bg-zinc-600">
      <div
        className="bg flex min-w-[25%] justify-center"
        style={{
          backgroundImage: `url(${imageFromAPIBasePath}${item.media.backdrop})`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex w-full items-center justify-center bg-black bg-opacity-50">
          <Link href={`/media/${item.media.type}/${item.media.id}`}>
            <div className="max-h-[150px]">
              <Image
                alt={`${item.media.title} poster`}
                src={
                  item.media.poster
                    ? `${imageFromAPIBasePath}${item.media.poster}`
                    : "/images/posterunavailable.png"
                }
                width={100}
                height={200}
                className="border-x-[6px] border-y-2 border-black opacity-100"
              />
            </div>
          </Link>
        </div>
      </div>
      <div className="flex w-full flex-col gap-1 overflow-hidden p-4">
        <span className="text-2xl">{item.media.title}</span>
        <TagSection listItem={item} allTags={allTags.tags} />
      </div>
    </div>
  );
};
