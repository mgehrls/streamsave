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
  const { removeTagById, removingTag } = useListActions();

  if (deletable == undefined) deletable = false;
  return (
    <>
      {removingTag && <Loading />}

      {confirmDelete && listItemId && (
        <div className="flex">
          <button
            className="flex items-center gap-3 rounded-l-md border-r-2 border-black bg-slate-200 px-2 py-1 text-red-800"
            key={tag.id}
            onClick={() => {
              removeTagById({ id: listItemId, tagId: tag.id });
            }}
          >
            {`Remove ${tag.name}?`}
            <FaX />
          </button>
          <button
            className="flex items-center gap-3 rounded-r-md bg-slate-200 px-2 py-1 text-black"
            onClick={() => setConfirmDelete(false)}
          >
            Keep it
          </button>
        </div>
      )}

      {deletable && !confirmDelete && (
        <button
          className="flex items-center gap-3 rounded-md bg-slate-200 px-2 py-1 text-red-800"
          key={tag.id}
          onClick={() => {
            setConfirmDelete(true);
          }}
        >
          {tag.name}
          <FaX />
        </button>
      )}

      {!deletable && (
        <span className="rounded-md bg-slate-200 px-1 py-0.5 text-xs tracking-wider text-black">
          {tag.name}
        </span>
      )}
    </>
  );
}
