import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import type { User } from "~/utils/types";
import SearchBar from "./SearchBar";

function Header({ user }: { user: User }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#15181c] text-white">
      <header className="relative flex w-full max-w-5xl items-center justify-between px-4 py-4 lg:px-2">
        <Link
          aria-label="Go to homepage for Stream save."
          href="/"
          className="flex items-end gap-1"
        >
          <Image
            priority
            src="/images/Streamsave.svg"
            alt="StreamSave Logo"
            width={1900}
            height={3330}
            className="h-auto w-[20px]"
          />
          <h1
            aria-label="Streamsave"
            className="hidden text-xl font-bold tracking-wide sm:block"
          >
            {/* Not a typo. The image is the S for users without visual impairment. */}
            treamSave
          </h1>
        </Link>
        <SearchBar />
        <div className="flex items-center gap-8 lg:gap-16">
          <Link
            className="hidden items-center justify-center whitespace-nowrap py-2 text-lg tracking-wide transition-all hover:scale-105 hover:rounded-md hover:underline motion-reduce:transition-none lg:flex"
            aria-label="Go to your list."
            href="/list"
          >
            My List
          </Link>
          {user.user && (
            <div onClick={(e) => e.stopPropagation()}>
              <button
                className="shrink-0"
                aria-label="Toggles a menu with a sign out button."
                onClick={() => setShowMenu(!showMenu)}
              >
                <Image
                  priority
                  src={user.user.imageUrl}
                  alt="User Profile Image"
                  width={50}
                  height={50}
                  className="shrink-0 rounded-full"
                />
              </button>
              <div
                className={
                  showMenu
                    ? `absolute right-0 top-[87px] z-50 flex flex-col gap-2 border-[1px] border-slate-400 bg-zinc-900 px-4 py-4 opacity-100 transition-none`
                    : "hidden"
                }
              >
                <Link
                  className="items-center justify-center p-2 text-center text-lg tracking-wide transition-all hover:scale-105 hover:rounded-md hover:underline motion-reduce:transition-none lg:hidden"
                  aria-label="Go to your list."
                  href="/list"
                >
                  My List
                </Link>
                <SignOutButton>
                  <button
                    disabled={!showMenu}
                    className="flex items-center justify-center bg-pink-700 px-6 py-2 transition-all hover:scale-105 hover:rounded-md motion-reduce:transition-none"
                  >
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
