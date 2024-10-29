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

    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY > 100) {
        setShowSearch(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("focus", handleFocus);
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("focus", handleFocus);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("scroll", handleScroll);
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
      className="my-4 w-full self-center px-4 md:mr-0 md:w-full md:max-w-lg md:self-end lg:px-0"
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
          aria-label="Close search results"
          onClick={() => {
            setShowSearch(false);
            setSearchQuery("");
          }}
          className="absolute -top-1 right-4 z-50 p-2 text-white"
        >
          X
        </button>
      )}

      {showSearch && (
        <SearchResults
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setShowSearch={setShowSearch}
        />
      )}
    </div>
  );
}

export default SearchBar;
