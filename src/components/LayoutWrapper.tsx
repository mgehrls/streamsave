import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types/dist/user";
import { useEffect, useState } from "react";
import SearchResults from "./SearchResults";

export default function LayoutWrapper({
  children,
  user,
}: {
  children: React.ReactNode;
  user:
    | {
        isLoaded: true;
        isSignedIn: false;
        user: null;
      }
    | {
        isLoaded: true;
        isSignedIn: true;
        user: UserResource;
      };
}) {
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    const handleFocus = () => {
      if (searchQuery !== "") {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };

    const handleClick = () => {
      setShowMenu(false);
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
          console.log("ran");
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
  }, [searchQuery, timer]);

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
    return !showMenu
      ? "absolute -bottom-[74px] right-0 z-50 bg-zinc-900 px-4 py-4 opacity-0 transition-none"
      : "absolute -bottom-[74px] right-0 z-50 border-[1px] border-slate-400 bg-zinc-900 px-4 py-4 opacity-100 transition-none";
  };

  return (
    <div className="min-h-screen w-full bg-zinc-800 text-slate-50">
      <div className="flex min-h-screen w-full items-start justify-center">
        <div className="flex min-h-screen w-full max-w-4xl flex-col justify-between">
          <header className="relative flex items-center justify-between bg-black px-4 py-4 lg:px-8">
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
            {user.isSignedIn && (
              <div onClick={(e) => e.stopPropagation()}>
                <div id="user-menu" className={getMenuClassNames()}>
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
            <div onClick={(e) => e.stopPropagation()} className="relative">
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
                  onClick={() => setSearchQuery("")}
                  className="absolute -top-1 right-2 z-50 p-2 text-black"
                >
                  X
                </button>
              )}

              {showSearch && (
                <div className="absolute left-0 top-8 z-10 flex max-h-96 w-full flex-col overflow-y-scroll bg-black bg-opacity-50">
                  <SearchResults
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                  />
                </div>
              )}
            </div>
          )}
          <div>{children}</div>
          <footer className="mt-auto">
            <div className="flex flex-col items-center justify-center bg-black px-8 py-8">
              <p className="text-md text-slate-200">
                &copy; 2023 StreamSave. All rights reserved.
              </p>
              <p className="text-md text-slate-200">
                data and images courtesy of{" "}
                <a
                  className="font-bold underline"
                  href="https://www.themoviedb.org/"
                >
                  themoviedb.org
                </a>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
