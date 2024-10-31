import { LayoutGrid } from "lucide-react";
import React from "react";
import { FaList } from "react-icons/fa";
import { genresFromAPI } from "~/utils/genres";

type FilterProps = {
  setView: (view: "list" | "cards") => void;
  setTypeFilter: (type: "all" | "tv" | "movie") => void;
  setTagFilter: (tag: string) => void;
  view: "list" | "cards";
};

const Filters = ({
  setView,
  setTypeFilter,
  setTagFilter,
  view,
}: FilterProps) => {
  return (
    <div className="flex gap-4">
      <select
        onChange={(e) =>
          setTypeFilter(e.target.value as "all" | "tv" | "movie")
        }
        name="mediaFilter"
        className="w-24 rounded-md bg-[#36526a] px-1 py-0.5 text-xs tracking-wider text-white"
        placeholder="Filter by Media"
      >
        <option value={"all"}>All Media</option>
        <option value={"tv"}>TV</option>
        <option value={"movie"}>Movies</option>
      </select>
      <select
        defaultValue={"none"}
        placeholder="Filter by Tag"
        className="w-24 rounded-md bg-[#36526a] px-1 py-0.5 text-xs tracking-wider text-white"
        id="tagFilter"
        onChange={(e) => {
          setTagFilter(e.target.value);
        }}
      >
        <option placeholder="Filter by tag" value={""}>
          All Tags
        </option>
        {genresFromAPI.map((tag) => {
          return (
            <option
              onSelect={() => console.log(tag.name)}
              key={tag.id}
              id={tag.id.toString()}
              value={tag.name}
            >
              {tag.name}
            </option>
          );
        })}
      </select>
      {view === "list" ? (
        <button
          className="text-white"
          aria-label="Change view from list to media cards"
          onClick={() => setView("cards")}
        >
          <LayoutGrid />
        </button>
      ) : (
        <button
          className="text-white"
          aria-label="Change view from media cards to list"
          onClick={() => setView("list")}
        >
          <FaList size={22} />
        </button>
      )}
    </div>
  );
};

export default Filters;
