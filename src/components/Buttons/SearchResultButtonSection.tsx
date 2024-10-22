import { useState } from "react";

import useListActions from "~/utils/useListActions";
import FavoriteButton from "./FavoriteButton";
import WatchLaterButton from "./WatchLaterButton";
import DestructiveModal from "../Modals/DestructiveModal";

import type { MongoMedia } from "~/utils/types";

const SearchResultButtonSection = ({
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
        addingFav={addingFav}
        addFav={() => addFavToList({ media: media })}
        updating={updating}
        changeWatchLaterToFav={() => {
          if (listItemId)
            changeWatchLaterValue({
              id: listItemId,
              watchLater: false,
              lastSeen: "",
            });
        }}
        removing={removing}
        removeFav={() => {
          setOpenModal(true);
        }}
        listItemId={listItemId}
        isWatchLater={isWatchLater}
        mediaTitle={media.title}
      />
      <WatchLaterButton
        addingWatchLater={addingWatchLater}
        addWatchLater={() => {
          media.watchLater = true;
          addWatchLaterToList({ media: media });
        }}
        removing={removing}
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
