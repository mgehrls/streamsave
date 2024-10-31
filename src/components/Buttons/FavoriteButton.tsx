import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type FavoriteButtonProps = {
  slugPage?: boolean;
  addFav: () => void;
  changeWatchLaterToFav: () => void;
  removeFav: () => void;
  listItemId: string | undefined;
  isWatchLater: boolean;
  mediaTitle: string;
};

function FavoriteButton({
  addFav,
  changeWatchLaterToFav,
  removeFav,
  listItemId,
  isWatchLater,
  mediaTitle,
  slugPage,
}: FavoriteButtonProps) {
  const getAriaLabelForButton = () => {
    if (!listItemId) {
      return `Add ${mediaTitle} to favorite list.`;
    }
    if (isWatchLater) {
      return `Change ${mediaTitle} from watch later to favorite`;
    }
    return `Remove ${mediaTitle} from list. Requires confirmation.`;
  };

  const handleClick = () => {
    if (!listItemId) {
      addFav();
    } else if (isWatchLater) {
      changeWatchLaterToFav();
    } else {
      removeFav();
    }
  };

  const buttonContent = () => {
    if (!listItemId) {
      return (
        <>
          <FaRegHeart size={20} />
          {slugPage && <span>Favorite</span>}
        </>
      );
    }
    if (isWatchLater) {
      return (
        <>
          <FaRegHeart size={20} />
          {slugPage && <span>Favorite</span>}
        </>
      );
    }
    return (
      <>
        <FaHeart fill="red" size={20} />
        {slugPage && <span>Remove</span>}
      </>
    );
  };

  return (
    <button
      className={
        slugPage
          ? "flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold"
          : "m-2 mx-2 mb-1"
      }
      aria-label={getAriaLabelForButton()}
      onClick={() => handleClick()}
    >
      {buttonContent()}
    </button>
  );
}

export default FavoriteButton;
