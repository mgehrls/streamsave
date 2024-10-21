import LayoutWrapper from "~/components/Layout/LayoutWrapper";
import { api } from "~/utils/api";
import type { MongoListItem } from "~/utils/types";
import Link from "next/link";
import TagSection from "~/components/TagSection";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import Loading from "~/components/Loading";
import useListActions from "~/utils/useListActions";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { genresFromAPI } from "~/utils/genres";
import DestructiveModal from "~/components/Modals/DestructiveModal";

export default function List() {
  const user = useUser();
  let { data: list } = api.listItem.getUserList.useQuery();
  const [showFavorites, setShowFavorites] = useState(true);
  const [typeFilter, setTypeFilter] = useState<"all" | "tv" | "movie">("all");
  // const { data: allTags } = api.listItem.getAllTags.useQuery();
  // create filters, sort, and view state,
  const [tagFilter, setTagFilter] = useState<string>("");
  const [sort, setSort] = useState<"alphaUp" | "alphaDown">("alphaUp");

  if (!list)
    return (
      <div>
        <Loading />
      </div>
    );

  // filter the list based on the showFavorites state
  if (showFavorites) {
    list = list.filter((item) => !item.media.watchLater);
  } else {
    list = list.filter((item) => item.media.watchLater);
  }
  // filter the list based on the typeFilter state
  if (typeFilter === "tv") {
    list = list.filter((item) => item.media.type === "tv");
  } else if (typeFilter === "movie") {
    list = list.filter((item) => item.media.type === "movie");
  }
  // filter the list based on the tagFilter state
  if (tagFilter !== "") {
    list = list.filter((item) =>
      item.media.tags.some((tag) => tag.name === tagFilter),
    );
  }
  list = list.sort((a, b) => {
    if (sort === "alphaUp") {
      return a.media.title.localeCompare(b.media.title);
    } else {
      return b.media.title.localeCompare(a.media.title);
    }
  });

  return (
    <LayoutWrapper user={user}>
      <Head>
        <title>Your List</title>
        <meta
          name="description"
          content="the page where you sort and filter your list"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-4">
        <div className="flex items-center justify-between rounded-t-2xl bg-[#36526a] p-4">
          <div className="flex items-end gap-2 lg:gap-4">
            <h1 className="text-2xl font-semibold tracking-wide text-white lg:text-4xl">
              {showFavorites ? "Favorites" : "Watch Later"}
            </h1>
            <p aria-hidden className="text-lg text-white/70">
              |
            </p>
            <button onClick={() => setShowFavorites(!showFavorites)}>
              <h2 className="text-lg font-semibold text-white/70 lg:text-xl">
                {showFavorites ? "Watch Later" : "Favorites"}
              </h2>
            </button>
          </div>
          <div className="flex gap-2">
            <div>
              <select
                onChange={(e) =>
                  setTypeFilter(e.target.value as "all" | "tv" | "movie")
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
                placeholder="Filter by Tag"
                className="w-28 rounded-md bg-slate-200 px-1 py-0.5 text-xs tracking-wider text-black"
                id="tagFilter"
                onChange={(e) => {
                  setTagFilter(e.target.value);
                }}
              >
                <option value={""}>Remove Filter</option>
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
          </div>
        </div>
        <div className="flex flex-col">
          {list.map((item, i) => {
            return <ListView item={item} index={i} key={item.media.id} />;
          })}
        </div>
      </div>
    </LayoutWrapper>
  );
}

const ListView = ({ item, index }: { item: MongoListItem; index: number }) => {
  const { removeFromList } = useListActions();
  const [showModal, setShowModal] = useState(false);
  if (!item) return <Loading />;

  return (
    <div
      className={`flex text-white ${
        index % 2 === 1 ? "bg-zinc-800" : "bg-zinc-700"
      }`}
    >
      <DestructiveModal
        mediaTitle={item.media.title}
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirmation={() => removeFromList(item._id as string)}
      />
      <div className="grid w-full grid-cols-12 place-content-center gap-2 overflow-hidden px-4 py-2">
        <Link
          className="col-span-5 place-content-center lg:col-span-4"
          aria-label={`Go to ${item.media.title}'s page.`}
          href={`/media/${item.media.type}/${item.media.id}`}
        >
          <p className="text-base lg:text-lg">{item.media.title}</p>
        </Link>
        <div className="col-span-6 place-content-center lg:col-span-7">
          <TagSection listItem={item} />
        </div>
        <button
          className="text-red-600 lg:col-span-1"
          onClick={() => setShowModal(true)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};
