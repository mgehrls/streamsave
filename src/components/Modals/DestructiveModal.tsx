import React from "react";
import { FaCircleExclamation } from "react-icons/fa6";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirmation: () => void;
  mediaTitle: string;
};

function DestructiveModal({
  open,
  onClose,
  onConfirmation,
  mediaTitle,
}: ModalProps) {
  if (!open) return null;
  return (
    <div
      onClick={() => onClose()}
      className="fixed left-0 top-0 z-50 grid h-screen w-screen place-content-center bg-black/60"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex max-w-lg flex-col items-center justify-center gap-4 rounded-lg bg-white p-8"
      >
        <FaCircleExclamation className="text-4xl text-black" />
        <p className="text-center text-xl text-black">Delete this item?</p>
        <p className="text-center text-base text-black">
          This will remove &quot;{mediaTitle}&quot; from your list.
        </p>
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            autoFocus
            aria-label={`Cancel and choose to keep ${mediaTitle} in your list.`}
            onClick={() => onClose()}
            className="rounded-lg border-2 bg-black px-4 py-2 text-white"
          >
            Cancel
          </button>
          <button
            tabIndex={0}
            aria-label={`Confirm deletion of ${mediaTitle}.`}
            onClick={() => onConfirmation()}
            className="rounded-lg border-2 border-red-600 bg-red-600 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DestructiveModal;
