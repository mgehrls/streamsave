import React from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

function Modal({ open, onClose }: ModalProps) {
  const [showWhy, setShowWhy] = React.useState(false);
  if (!open) return null;
  return (
    <div
      onClick={() => onClose()}
      className="absolute left-0 top-0 z-50 grid h-screen w-screen place-content-center bg-black/60"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="grid max-w-lg place-content-center gap-4 rounded-lg bg-white p-8"
      >
        <p className="text-center text-xl text-black">
          All database related features are currently under construction. Feel
          free to browse for now.
        </p>
        <p className="text-center text-black">Sorry for the inconvenience.</p>
        {showWhy && (
          <p className="text-center text-black">
            This site used to use a free database provider. That company removed
            it&apos;s free tier and shut off the database. The new database will
            be up and running as soon as possible.
          </p>
        )}
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            onClick={() => onClose()}
            className="rounded-lg border-2 border-black px-4 py-2 text-black"
          >
            Okay
          </button>
          {!showWhy && (
            <button
              onClick={() => setShowWhy(true)}
              className="rounded-lg border-2 border-black px-4 py-2 text-black"
            >
              Why?
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
