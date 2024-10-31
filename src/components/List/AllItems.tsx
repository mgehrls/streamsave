import React from "react";
import type { WithId } from "mongodb";
import type { MongoListItem, DeleteMediaProps } from "~/utils/types";
import ListItem from "./ListItem";
import MediaCard from "../MediaCard";

function AllItems({
  list,
  view,
  deleteMedia,
}: {
  list: WithId<MongoListItem>[];
  view: "list" | "cards";
  deleteMedia: DeleteMediaProps;
}) {
  if (list.length === 0) {
    return (
      <div>
        <p className="text-lg text-white">No items fit this criteria.</p>
      </div>
    );
  }

  if (view === "list") {
    return (
      <div className="flex flex-col transition-all motion-reduce:transition-none">
        {list.map((item, i) => {
          return (
            <ListItem
              item={item}
              index={i}
              key={item.media.id}
              deleteMedia={deleteMedia}
            />
          );
        })}
      </div>
    );
  } else {
    return (
      <div className="flex flex-wrap justify-evenly gap-4 rounded-b-lg bg-zinc-700 p-4 transition-all motion-reduce:transition-none">
        {list.map((item) => {
          return (
            <MediaCard
              item={item}
              key={item.media.id}
              deleteMedia={deleteMedia}
            />
          );
        })}
      </div>
    );
  }
}

export default AllItems;
