import { useState } from "react";

import useListActions from "~/utils/useListActions";
import FavoriteButton from "./FavoriteButton";
import WatchLaterButton from "./WatchLaterButton";
import DestructiveModal from "../Modals/DestructiveModal";

import type { MongoMedia } from "~/utils/types";
import { type ObjectId } from "mongodb";

const SearchResultButtonSection = ({
  listItemId,
  isWatchLater,
  media,
}: {
  listItemId: ObjectId | undefined;
  isWatchLater: boolean;
  media: MongoMedia;
}) => {
  const {
    addFavToList,
    addWatchLaterToList,
    removeFromList,
    changeWatchLaterValue,
  } = useListActions();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex items-end gap-8 pt-4">
      <DestructiveModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirmation={() => {
          if (listItemId) removeFromList(listItemId);
          setOpenModal(false);
        }}
        mediaTitle={media.title}
      />
      <FavoriteButton
        addFav={() => addFavToList({ media: media })}
        changeWatchLaterToFav={() => {
          if (listItemId)
            changeWatchLaterValue({
              id: listItemId,
              watchLater: false,
              lastSeen: "",
            });
        }}
        removeFav={() => {
          setOpenModal(true);
        }}
        listItemId={listItemId}
        isWatchLater={isWatchLater}
        mediaTitle={media.title}
      />
      <WatchLaterButton
        addWatchLater={() => {
          media.watchLater = true;
          addWatchLaterToList({ media: media });
        }}
        removeWatchLater={() => {
          setOpenModal(true);
        }}
        listItemId={listItemId}
        isWatchLater={isWatchLater}
        mediaTitle={media.title}
      />
    </div>
  );
};

export default SearchResultButtonSection;
