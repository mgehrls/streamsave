import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import type { User } from "~/utils/types";

function Header({ user }: { user: User }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex w-full flex-col items-center justify-center bg-[#15181c] text-white">
      <header className="relative flex w-full max-w-5xl items-center justify-between px-4 py-4 lg:px-2">
        <Link href="/" className="flex items-end gap-1">
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
            treamSave
          </h1>
        </Link>

        {user.user && (
          <div onClick={(e) => e.stopPropagation()}>
            <div
              id="user-menu"
              className={
                !showMenu
                  ? "absolute -top-[200px] right-0 z-50 bg-zinc-900 px-4 py-4 opacity-0 transition-none"
                  : `absolute right-0 top-[87px] z-50 flex flex-col gap-2 border-[1px] border-slate-400 bg-zinc-900 px-4 py-4 opacity-100 transition-none`
              }
            >
              {/* <Link href="/">
                <button className="flex items-center justify-center py-2 transition-all hover:scale-105 hover:rounded-md hover:underline">
                  Home
                </button>
              </Link>
              <Link href="/list">
                <button className="flex items-center justify-center py-2 transition-all hover:scale-105 hover:rounded-md hover:underline">
                  List
                </button>
              </Link> */}
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
    </div>
  );
}

export default Header;
