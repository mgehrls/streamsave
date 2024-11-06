import { LayoutGrid } from "lucide-react";
import React from "react";
import { FaList } from "react-icons/fa";
import { FaFilter, FaX } from "react-icons/fa6";
import { genresFromAPI } from "~/utils/genres";

type FilterProps = {
  setView: (view: "list" | "cards") => void;
  typeFilter: "all" | "tv" | "movie";
  setTypeFilter: (type: "all" | "tv" | "movie") => void;
  tagFilter: string;
  setTagFilter: (tag: string) => void;
  view: "list" | "cards";
};

const Filters = ({
  setView,
  typeFilter,
  setTypeFilter,
  tagFilter,
  setTagFilter,
  view,
}: FilterProps) => {
  const [showFilters, setShowFilters] = React.useState(false);
  return (
    <div>
      <div className="relative text-slate-200 md:hidden">
        <button
          aria-label={showFilters ? "Hide filters" : "Show filters"}
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 rounded-full bg-slate-800 px-4 md:hidden"
        >
          <FaFilter size={10} />
          <p>Filters</p>
        </button>
        {showFilters && (
          <div className="absolute right-0 z-10 bg-slate-800">
            <div className="flex flex-col items-center gap-8 rounded-md border-[1px] border-slate-200 p-4 py-8">
              <div className="flex items-center gap-4">
                <select
                  onChange={(e) =>
                    setTypeFilter(e.target.value as "all" | "tv" | "movie")
                  }
                  value={typeFilter}
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
                  value={tagFilter}
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
              </div>
              <div className="flex w-full items-center justify-between">
                {view === "list" ? (
                  <button
                    className="px-4 text-white"
                    aria-label="Change view from list to media cards"
                    onClick={() => setView("cards")}
                  >
                    <LayoutGrid />
                  </button>
                ) : (
                  <button
                    className="px-4 text-white"
                    aria-label="Change view from media cards to list"
                    onClick={() => setView("list")}
                  >
                    <FaList size={22} />
                  </button>
                )}
                <button
                  className="flex items-center gap-2 rounded-full border-[1px] border-slate-200 px-4"
                  onClick={() => {
                    setTypeFilter("all");
                    setTagFilter("");
                  }}
                >
                  <FaX />
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="hidden gap-4 md:flex">
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
    </div>
  );
};

export default Filters;
