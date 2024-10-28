import React from "react";
import { FaStar } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";

type WatchLaterButtonProps = {
  addWatchLater: () => void;
  removeWatchLater: () => void;
  listItemId: string | undefined;
  isWatchLater: boolean;
  mediaTitle: string;
  slugPage?: boolean;
};

function WatchLaterButton({
  addWatchLater,
  removeWatchLater,
  listItemId,
  isWatchLater,
  mediaTitle,
  slugPage,
}: WatchLaterButtonProps) {
  const ariaLabel = () => {
    if (isWatchLater) {
      return `Remove ${mediaTitle} from watch later list. Requires confirmation.`;
    }
    return `Add ${mediaTitle} to watch later list.`;
  };
  const handleClick = () => {
    if (isWatchLater) {
      removeWatchLater();
    } else {
      addWatchLater();
    }
  };
  const buttonContent = () => {
    if (isWatchLater) {
      return (
        <>
          <FaStar fill="#0284c7" size={20} />
          {slugPage && <span>Remove</span>}
        </>
      );
    } else if (!listItemId) {
      return (
        <>
          <FaClockRotateLeft size={20} />
          {slugPage && <span className="truncate">Watch Later</span>}
        </>
      );
    }
  };

  if (!isWatchLater && listItemId) {
    return null;
  } else {
    return (
      <button
        className={
          slugPage
            ? "flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold"
            : ""
        }
        aria-label={ariaLabel()}
        onClick={() => handleClick()}
      >
        {buttonContent()}
      </button>
    );
  }
}

export default WatchLaterButton;
