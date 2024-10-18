import React, { useEffect, useState } from "react";
import SearchResults from "../SearchResults";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleFocus = () => {
      if (searchQuery !== "") {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };

    const handleClick = () => {
      setSearchQuery("");
      setShowSearch(false);
    };

    const handleKeydown = (e: { key: string }) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setSearchQuery("");
        const searchBar = document.getElementById(
          "search-bar",
        ) as HTMLInputElement;
        searchBar?.blur();
        if (document.activeElement) {
          (document.activeElement as HTMLInputElement).blur();
        }
      }
    };

    document.addEventListener("focus", handleFocus);
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("focus", handleFocus);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeydown);
      clearTimeout(timer);
    };
  }, [searchQuery, timer, isClient]);

  const debounce = () => {
    if (timer) {
      clearTimeout(timer);
    }

    setTimer(
      setTimeout(() => {
        setShowSearch(true);
      }, 1000),
    );
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative my-4 w-full self-center px-4 lg:mr-0 lg:w-full lg:max-w-lg lg:self-end lg:px-0"
    >
      <input
        type="text"
        id="search-bar"
        placeholder="Search for shows or movies..."
        className="relative top-0 z-20 w-full bg-[#2E3138] px-4 py-1 text-white/70"
        value={searchQuery}
        onInput={debounce}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery !== "" && (
        <button
          onClick={() => {
            setShowSearch(false);
            setSearchQuery("");
          }}
          className="absolute -top-1 right-2 z-50 p-2 text-black"
        >
          X
        </button>
      )}

      {showSearch && (
        <div className="absolute left-0 top-8 z-10 mx-auto ml-2 flex max-h-96 flex-col overflow-y-scroll bg-opacity-50">
          <SearchResults
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setShowSearch={setShowSearch}
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
