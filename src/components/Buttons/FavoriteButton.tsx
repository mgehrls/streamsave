import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Loading from "../Loading";

type FavoriteButtonProps = {
  addingFav: boolean;
  updating: boolean;
  removing: boolean;
  addFav: () => void;
  changeWatchLaterToFav: () => void;
  removeFav: () => void;
  listItemId: string | undefined;
  isWatchLater: boolean;
  mediaTitle: string;
};

function FavoriteButton({
  addingFav,
  addFav,
  updating,
  changeWatchLaterToFav,
  removing,
  removeFav,
  listItemId,
  isWatchLater,
  mediaTitle,
}: FavoriteButtonProps) {
  if (!listItemId) {
    return (
      <>
        {!addingFav ? (
          <button
            aria-label={`Add ${mediaTitle} to favorite list.`}
            onClick={() => addFav()}
          >
            <FaRegHeart size={20} />
          </button>
        ) : (
          <Loading />
        )}
      </>
    );
  } else if (isWatchLater) {
    return (
      <>
        {!updating ? (
          <button
            aria-label={`Change ${mediaTitle} from watch later to favorite`}
            onClick={() => changeWatchLaterToFav()}
          >
            <FaRegHeart size={20} />
          </button>
        ) : (
          <Loading />
        )}
      </>
    );
  } else {
    return (
      <>
        {!removing ? (
          <button
            aria-label={`Remove ${mediaTitle} from list. Requires confirmation.`}
            onClick={() => removeFav()}
          >
            <FaHeart fill="red" size={20} />
          </button>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}

export default FavoriteButton;
