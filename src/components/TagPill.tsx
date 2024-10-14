import { useState } from "react";
import { FaX } from "react-icons/fa6";
import useListActions from "~/utils/useListActions";
import Loading from "./Loading";

export default function TagPill({
  tag,
  deletable,
  listItemId,
}: {
  key: number;
  tag: { id: number; name: string };
  deletable?: boolean;
  listItemId?: string;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  // const { removeTagById, removingTag } = useListActions();

  // const defaultClasses =
  //   "rounded-md bg-slate-200 px-1 py-0.5 text-xs tracking-wider text-black";
  // const deletableClasses =
  //   "flex items-center gap-3 rounded-md border-r-2 border-black bg-slate-200 px-2 py-1 text-red-800";
  // const confirmDeleteClasses =
  //   "flex items-center gap-3 rounded-l-md border-r-2 border-black bg-slate-200 px-2 py-1 text-red-800";

  if (deletable == undefined) deletable = false;
  return (
    <>
      {/* {removingTag && <Loading />} */}

      <div className="flex">
        {/* <button
          disabled={!deletable}
          className={
            deletable
              ? confirmDelete
                ? confirmDeleteClasses
                : deletableClasses
              : defaultClasses
          }
          key={tag.id}
          onClick={() => {
            if (!listItemId) return;
            if (confirmDelete) {
              removeTagById({ id: listItemId, tagId: tag.id });
            } else {
              setConfirmDelete(true);
            }
          }}
        >
          {confirmDelete ? `Remove ${tag.name}?` : tag.name}
          {deletable && <FaX />}
        </button> */}
        {deletable && confirmDelete && (
          <button
            className="flex items-center gap-3 rounded-r-md bg-slate-200 px-2 py-1 text-black"
            onClick={() => setConfirmDelete(false)}
          >
            Keep it
          </button>
        )}
      </div>
    </>
  );
}
