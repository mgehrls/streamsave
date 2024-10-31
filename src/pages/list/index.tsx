import LayoutWrapper from "~/components/Layout/LayoutWrapper";
import { api } from "~/utils/api";
import Head from "next/head";
import { useUser } from "@clerk/nextjs";
import Loading from "~/components/Loading";
import useListActions from "~/utils/useListActions";
import { useState } from "react";
import DestructiveModal from "~/components/Modals/DestructiveModal";
import Filters from "~/components/List/Filters";
import AllItems from "~/components/List/AllItems";

export default function List() {
  const { removeFromList } = useListActions();
  const [showModal, setShowModal] = useState(false);
  const [titleToDelete, setTitleToDelete] = useState<string | null>(null);
  const [idToDelete, setIdToDelete] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(true);
  const [typeFilter, setTypeFilter] = useState<"all" | "tv" | "movie">("all");
  const [view, setView] = useState<"list" | "cards">("list");
  const [tagFilter, setTagFilter] = useState<string>("");

  let { data: list } = api.listItem.getUserList.useQuery();
  const user = useUser();

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
    return a.media.title.localeCompare(b.media.title);
  });

  const handleDeleteConfirmation = () => {
    if (idToDelete) {
      removeFromList(idToDelete);
      setShowModal(false);
      setTitleToDelete(null);
      setIdToDelete(null);
    } else {
      alert(
        "No media set for deletion. Something must have gone wrong. Please try again.",
      );
    }
  };

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
      <DestructiveModal
        mediaTitle={titleToDelete ?? "Something went wrong"}
        open={showModal}
        onClose={() => setShowModal(false)}
        onConfirmation={() => handleDeleteConfirmation()}
      />
      <div className="mx-4 my-4 lg:mx-0">
        <div className="flex flex-col justify-between gap-2 rounded-t-2xl bg-[#36526a] p-4 md:flex-row md:items-center">
          <div className="flex items-end gap-2 lg:gap-4">
            <h1 className="text-2xl font-semibold tracking-wide text-white lg:text-4xl">
              {showFavorites ? "Favorites" : "Watch Later"}
            </h1>
            <p aria-hidden className="text-lg text-white/70">
              |
            </p>
            <button
              className="text-lg font-semibold text-white/70 lg:text-xl"
              aria-label={`Change list to ${
                showFavorites ? "Watch Later" : "Favorites"
              }`}
              onClick={() => setShowFavorites(!showFavorites)}
            >
              {showFavorites ? "Watch Later" : "Favorites"}
            </button>
          </div>
          <Filters
            setView={setView}
            setTypeFilter={setTypeFilter}
            setTagFilter={setTagFilter}
            view={view}
          />
        </div>
        <AllItems
          list={list}
          view={view}
          deleteMedia={{
            setMediaTitle: setTitleToDelete,
            setMediaToDeleteId: setIdToDelete,
            setConfirmDeletion: setShowModal,
          }}
        />
      </div>
    </LayoutWrapper>
  );
}
