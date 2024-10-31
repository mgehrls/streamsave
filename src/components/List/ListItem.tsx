import React from "react";
import TagSection from "../TagSection";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import type { DeleteMediaProps, MongoListItem } from "~/utils/types";

import Loading from "../Loading";

const ListItem = ({
  item,
  index,
  deleteMedia,
}: {
  item: MongoListItem;
  index: number;
  deleteMedia: DeleteMediaProps;
}) => {
  if (!item) return <Loading />;

  return (
    <div
      className={`flex text-white ${
        index % 2 === 1 ? "bg-zinc-800" : "bg-zinc-700"
      }`}
    >
      <div className="grid w-full grid-cols-12 place-content-center gap-2 overflow-hidden px-4 py-2">
        <Link
          className="col-span-5 place-content-center lg:col-span-4"
          aria-label={`Go to ${item.media.title}'s page.`}
          href={`/media/${item.media.type}/${item.media.id}`}
        >
          <p className="text-base lg:text-lg">{item.media.title}</p>
        </Link>
        <div className="col-span-6 place-content-center lg:col-span-7">
          <TagSection listItem={item} />
        </div>
        <button
          aria-label={`Remove ${item.media.title} from your list. Requires confirmation.`}
          className="text-red-600 lg:col-span-1"
          onClick={() => {
            deleteMedia.setMediaTitle(item.media.title);
            deleteMedia.setMediaToDeleteId(item._id as string);
            deleteMedia.setConfirmDeletion(true);
          }}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default ListItem;
