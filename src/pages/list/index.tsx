import LayoutWrapper from "~/components/Layout/LayoutWrapper";
import { api } from "~/utils/api";
import type { MongoListItem } from "~/utils/types";
import Link from "next/link";
import TagSection from "~/components/TagSection";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import Loading from "~/components/Loading";

export default function List() {
  const user = useUser();
  const { data: list } = api.listItem.getUserList.useQuery();
  // const { data: allTags } = api.listItem.getAllTags.useQuery();
  //create filters, sort, and view state,
  // const [filters, setFilters] = useState<{
  //   mediaType: string;
  //   tag: string;
  // }>({ mediaType: "all", tag: "" });
  // const [sort, setSort] = useState<
  //   "alphaUp" | "alphaDown" | "dateAddedUp" | "dateAddedDown"
  // >("alphaUp");
  //filter and sort the list up here
  //pass the filtered and sorted list to the different views

  if (!list) return <div>Loading...</div>;

  // function isTagPresentInListItem(
  //   item: {
  //     media: {
  //       id: number;
  //       createdAt: Date;
  //       title: string;
  //       type: string;
  //       poster: string;
  //       backdrop: string;
  //       description: string;
  //     };
  //     tags: {
  //       id: number;
  //       name: string;
  //     }[];
  //   } & {
  //     id: string;
  //     createdAt: Date;
  //     lastSeen: string;
  //     userId: string;
  //     mediaId: number;
  //     watchLater: boolean;
  //   },
  //   filter: { mediaType: string; tag: string },
  // ): boolean {
  //   const tagsInItem = item.tags.map((tag) => tag.name);
  //   const tagToFilter = filter.tag;

  //   const commonTags = tagsInItem.includes(tagToFilter);

  //   return commonTags;
  // }

  // const filteredList = list.filter((item) => {
  //   if (filters.mediaType === "all") {
  //     if (filters.tag === "") return true;
  //     if (filters.tag) {
  //       return isTagPresentInListItem(item, filters);
  //     }
  //   } else if (filters.mediaType === "movie") {
  //     if (item.media.type === "movie") {
  //       if (filters.tag === "") return true;
  //       if (filters.tag) {
  //         return isTagPresentInListItem(item, filters);
  //       }
  //     }
  //   } else if (filters.mediaType === "tv") {
  //     if (item.media.type === "tv") {
  //       if (filters.tag === "") return true;
  //       if (filters.tag) {
  //         return isTagPresentInListItem(item, filters);
  //       }
  //     }
  //   }
  // });

  // const sortedList = filteredList.sort((a, b) => {
  //   if (sort === "alphaUp") {
  //     return a.media.title.localeCompare(b.media.title);
  //   } else {
  //     return b.media.title.localeCompare(a.media.title);
  //   }
  // });

  return (
    <LayoutWrapper user={user}>
      <div>
        <Head>
          <title>Your List</title>
          <meta
            name="description"
            content="the page where you sort and filter your list"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="flex items-center justify-between rounded-t-2xl bg-[#36526a] p-4">
          <div className="flex items-end gap-4">
            <h1 className="text-4xl font-semibold text-white">Favorites</h1>
            <p aria-hidden className="text-lg text-white/70">
              |
            </p>
            <button>
              <h2 className="text-xl font-semibold text-white/70">
                Watch Later
              </h2>
            </button>
          </div>
          {/* <div className="flex flex-col gap-2">
            <div>
              <select
                onChange={(e) =>
                  setFilters({ mediaType: e.target.value, tag: filters.tag })
                }
                name="mediaFilter"
                className="w-28 rounded-md bg-slate-200 px-1 py-0.5 text-xs tracking-wider text-black"
                placeholder="Filter by Media"
              >
                <option value={"all"}>All</option>
                <option value={"tv"}>TV</option>
                <option value={"movie"}>Movies</option>
              </select>
            </div>
            <div className="flex">
              <select
                defaultValue={"none"}
                className="w-28 rounded-md bg-slate-200 px-1 py-0.5 text-xs tracking-wider text-black"
                id="tagFilter"
                onChange={(e) => {
                  setFilters({
                    mediaType: filters.mediaType,
                    tag: e.target.value,
                  });
                }}
              >
                <option value={""}>Filter by Tag</option>
                {genresFromAPI.map((tag) => {
                  return (
                    <option
                      onSelect={() => console.log(tag.name)}
                      key={tag.id}
                      id={tag.id.toString()}
                      value={tag.name}
                    >
                      {tag.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div> */}
        </div>
        <div className="my-2 flex flex-col gap-2">
          {list.map((item) => {
            return <ListView {...item} key={item.media.id} />;
          })}
        </div>
      </div>
    </LayoutWrapper>
  );
}

const ListView = (item: MongoListItem) => {
  if (!item) return <Loading />;

  return (
    <div className="flex bg-zinc-600 text-white">
      <div className="grid w-full grid-cols-12 place-content-center overflow-hidden px-4 py-2">
        <Link
          className="col-span-4 place-content-center"
          aria-label={`Go to ${item.media.title}'s page.`}
          href={`/media/${item.media.type}/${item.media.id}`}
        >
          <p className="text-lg">{item.media.title}</p>
        </Link>
        <div className="col-span-7 place-content-center">
          <TagSection listItem={item} />
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <span>Delete icon placeholder</span>
        </div>
      </div>
    </div>
  );
};
