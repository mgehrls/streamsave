import React from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import Loading from "../Loading";
import { FaClockRotateLeft } from "react-icons/fa6";

type WatchLaterButtonProps = {
  addingWatchLater: boolean;
  removing: boolean;
  addWatchLater: () => void;
  removeWatchLater: () => void;
  listItemId: string | undefined;
  isWatchLater: boolean;
  mediaTitle: string;
};

function WatchLaterButton({
  addingWatchLater,
  addWatchLater,
  removing,
  removeWatchLater,
  listItemId,
  isWatchLater,
  mediaTitle,
}: WatchLaterButtonProps) {
  if (isWatchLater) {
    return (
      <>
        {!removing ? (
          <button
            aria-label={`Remove ${mediaTitle} from watch later list. Requires confirmation.`}
            onClick={() => removeWatchLater()}
          >
            <FaStar fill="green" size={20} />
          </button>
        ) : (
          <Loading />
        )}
      </>
    );
  } else if (!listItemId) {
    return (
      <>
        {!addingWatchLater ? (
          <button
            aria-label={`Add ${mediaTitle} to watch later list.`}
            onClick={() => addWatchLater()}
          >
            <FaClockRotateLeft size={20} />
          </button>
        ) : (
          <Loading />
        )}
      </>
    );
  } else {
    return null;
  }
}

export default WatchLaterButton;
