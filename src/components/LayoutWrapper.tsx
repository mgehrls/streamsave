import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import type { UserResource } from "@clerk/types/dist/user";

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
  return (
    <div className="min-h-screen w-full bg-zinc-900 text-slate-50">
      <div className="flex min-h-screen w-full items-start justify-center">
        <div className="flex min-h-screen w-full max-w-5xl flex-col justify-between border-x border-slate-900">
          <header className="flex items-center justify-between bg-slate-800 px-8 py-4">
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
                <h1>treamSave</h1>
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
              <SignOutButton>
                <button className="flex items-center justify-center bg-pink-700 px-6 py-2 transition-all hover:scale-105 hover:rounded-md">
                  Sign Out
                </button>
              </SignOutButton>
            )}
          </header>
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
