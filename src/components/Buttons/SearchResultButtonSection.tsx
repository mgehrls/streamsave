import { FaRegHeart, FaStar, FaHeart } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MongoMedia } from "~/utils/types";
import useListActions from "~/utils/useListActions";
import Loading from "../Loading";
import FavoriteButton from "./FavoriteButton";
import DestructiveModal from "../Modals/DestructiveModal";
import { useState } from "react";
import WatchLaterButton from "./WatchLaterButton";

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
    <div className="flex w-full items-end justify-between gap-2 sm:pt-4">
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
