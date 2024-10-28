import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Loading from "../Loading";

type FavoriteButtonProps = {
  slugPage?: boolean;
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
  slugPage,
}: FavoriteButtonProps) {
  if (!listItemId) {
    return (
      <>
        {!addingFav ? (
          <button
            className={
              slugPage
                ? "flex items-center justify-center gap-2 rounded-md bg-sky-600 p-4 text-lg font-semibold"
                : ""
            }
            aria-label={`Add ${mediaTitle} to favorite list.`}
            onClick={() => addFav()}
          >
            <FaRegHeart size={20} />
            {slugPage && <span className="lg:sr-only">Favorite</span>}
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
            className={
              slugPage
                ? "flex items-center justify-center gap-2 rounded-md bg-sky-600 p-4 text-lg font-semibold"
                : ""
            }
            aria-label={`Change ${mediaTitle} from watch later to favorite`}
            onClick={() => changeWatchLaterToFav()}
          >
            <FaRegHeart size={20} />
            {slugPage && <span className="lg:sr-only">Favorite</span>}
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
            className={
              slugPage
                ? "flex items-center justify-center gap-2 rounded-md bg-sky-600 p-4 text-lg font-semibold"
                : ""
            }
            aria-label={`Remove ${mediaTitle} from list. Requires confirmation.`}
            onClick={() => removeFav()}
          >
            <FaHeart fill="red" size={20} />
            {slugPage && (
              <span className="lg:sr-only">Remove from Favorite List</span>
            )}
          </button>
        ) : (
          <Loading />
        )}
      </>
    );
  }
}

export default FavoriteButton;
