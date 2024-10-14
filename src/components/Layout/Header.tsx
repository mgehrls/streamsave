import { SignInButton, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState, useEffect } from "react";
import SearchResults from "../SearchResults";
import Image from "next/image";
import type { User } from "~/utils/types";

function Header({ user }: { user: User }) {
  const [showMenu, setShowMenu] = useState(false);
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
      setShowMenu(false);
      setSearchQuery("");
      setShowSearch(false);
    };

    const handleKeydown = (e: { key: string }) => {
      if (e.key === "Escape") {
        setShowSearch(false);
        setShowMenu(false);
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

  const getMenuClassNames = () => {
    if (!isClient) {
      return "";
    } else {
      const menuHeight = document.getElementById("user-menu")?.clientHeight;
      if (!menuHeight && isClient)
        return "absolute -top-[200px] right-0 z-50 bg-zinc-900 px-4 py-4 opacity-0 transition-none";
      return !showMenu
        ? "absolute -top-[200px] right-0 z-50 bg-zinc-900 px-4 py-4 opacity-0 transition-none"
        : `absolute top-[87px] flex flex-col gap-2 right-0 z-50 border-[1px] border-slate-400 bg-zinc-900 px-4 py-4 opacity-100 transition-none`;
    }
  };
  return (
    <div className="flex flex-col items-center justify-center bg-[#050505]">
      <header className="relative flex w-full max-w-5xl items-center justify-between px-4 py-4 lg:px-8">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-end gap-1 text-xl font-bold tracking-wide"
          >
            <Image
              priority
              src="/images/Streamsave.svg"
              alt="StreamSave Logo"
              width={1900}
              height={3330}
              className="h-auto w-6"
            />
            <h1 className="hidden sm:block">treamSave</h1>
          </Link>
        </div>
        {!user.isSignedIn && (
          <SignInButton>
            <button className="flex items-center justify-center bg-pink-700 px-6 py-2 transition-all hover:scale-105 hover:rounded-md">
              Sign In
            </button>
          </SignInButton>
        )}
        {user.isSignedIn && user.user && (
          <div onClick={(e) => e.stopPropagation()}>
            <div id="user-menu" className={getMenuClassNames()}>
              <Link href="/">
                <button className="flex items-center justify-center py-2 transition-all hover:scale-105 hover:rounded-md hover:underline">
                  Home
                </button>
              </Link>
              <Link href="/list">
                <button className="flex items-center justify-center py-2 transition-all hover:scale-105 hover:rounded-md hover:underline">
                  List
                </button>
              </Link>
              <SignOutButton>
                <button
                  disabled={!showMenu}
                  className="flex items-center justify-center bg-pink-700 px-6 py-2 transition-all hover:scale-105 hover:rounded-md"
                >
                  Sign Out
                </button>
              </SignOutButton>
            </div>
            <button onClick={() => setShowMenu(!showMenu)}>
              <Image
                priority
                src={user.user.imageUrl}
                alt="User Profile Image"
                width={50}
                height={50}
                className="rounded-full"
              />
            </button>
          </div>
        )}
      </header>
      {user.isSignedIn && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl"
        >
          <input
            type="text"
            id="search-bar"
            placeholder="Search for shows or movies..."
            className="relative top-0 z-20 w-full bg-gray-200 px-4 py-1 text-black duration-500 lg:focus:scale-110"
            value={searchQuery}
            onInput={debounce}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // window.location.assign(`/search?query=${searchQuery}`);
              }
            }}
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
            <div className="absolute left-0 top-8 z-10 mx-auto ml-2 flex max-h-96 min-w-[896] flex-col overflow-y-scroll bg-opacity-50">
              <SearchResults
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                setShowSearch={setShowSearch}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
