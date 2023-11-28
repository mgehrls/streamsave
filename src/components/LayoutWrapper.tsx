import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types/dist/user";
import { useState } from "react";
import Loading from "./Loading";
import { FaSearch } from "react-icons/fa";
import { doc } from "prettier";

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
  const [searchLoading, setSearchLoading] = useState(false);
  document.addEventListener("click", () => {
    setShowMenu(false);
  });
  document.addEventListener("keydown", (e) => {
    setShowMenu(false);
    if (e.key === "Escape") {
      setSearchLoading(false);
      setShowMenu(false);
      setSearchQuery("");
    }
  });
  let timer: NodeJS.Timeout;

  const debounce = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearchLoading(true);
      // get search results;
    }, 1000);
  };

  function checkSearchBarSticky() {
    const searchBar = document.getElementById("search-bar");
    if (searchBar) {
      const searchBarOffset = searchBar?.offsetTop;
      if (window.scrollY > searchBarOffset) {
        searchBar.classList.add("sticky");
        searchBar.classList.add("top-0");
        searchBar.classList.add("z-10");
        searchBar.classList.add("rounded-md");
      } else {
        searchBar.classList.remove("sticky");
        searchBar.classList.remove("top-0");
        searchBar.classList.remove("z-10");
        searchBar.classList.remove("rounded-md");
      }
    }
  }
  document.addEventListener("scroll", checkSearchBarSticky);

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-slate-50">
      <div className="flex min-h-screen w-full items-start justify-center">
        <div className="flex min-h-screen w-full max-w-5xl flex-col justify-between border-x border-slate-900">
          <header className="relative flex items-center justify-between bg-slate-800 px-4 py-4 lg:px-8">
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
                <div
                  id="user-menu"
                  className={
                    !showMenu
                      ? "absolute -bottom-[74px] right-0 z-20 bg-zinc-900 px-4 py-4 opacity-0 transition-none"
                      : "absolute -bottom-[74px] right-0 z-20 border-[1px] border-slate-400 bg-zinc-900 px-4 py-4 opacity-100 transition-none"
                  }
                >
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
            <>
              <div
                id="search-bar"
                className="flex items-center hover:opacity-100 focus:opacity-100"
              >
                <input
                  type="text"
                  placeholder="Search for shows or movies..."
                  className="relative w-full bg-gray-600 px-4 py-1"
                  value={searchQuery}
                  onInput={debounce}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // window.location.assign(`/search?query=${searchQuery}`);
                    }
                  }}
                />
                <button
                  className="flex h-8 w-10 items-center justify-center bg-slate-50"
                  disabled={searchQuery.length === 0}
                >
                  <FaSearch fill="black" size={25} />
                </button>
              </div>
              {searchLoading && <Loading />}
            </>
          )}
          {children}

          <footer className="mt-auto">
            <div className="flex flex-col items-center justify-center bg-slate-800 px-8 py-8">
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
