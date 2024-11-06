import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";

function TopSection() {
  return (
    <section className="flex w-full flex-col gap-4 lg:h-[800px] lg:flex-row">
      <div className="flex w-full items-center justify-center gap-8 py-20 lg:w-2/3">
        <Image
          priority
          src="/images/Streamsave.svg"
          alt="StreamSave Logo"
          width={1900}
          height={3330}
          className="w-1/4"
        />
        <div className="mt-4 text-slate-200">
          <span className="text-sm font-bold tracking-wider">
            Fill Your Show Hole
          </span>
          <h1 className="flex-shrink text-3xl font-medium md:text-5xl">
            Streamsave
          </h1>
          <p className="mt-2 w-72 leading-tight tracking-wide">
            Organize your favorite shows and movies, or discover new ones!
          </p>
        </div>
      </div>
      <div className="flex w-full items-center justify-center bg-gradient-to-t from-sky-700 to-transparent py-20 lg:w-1/3 lg:justify-start lg:bg-gradient-to-l lg:py-40 lg:pl-12">
        <div className="flex flex-col items-center gap-2">
          <SignInButton mode="modal">
            <button className="flex items-center justify-center bg-sky-600 px-12 py-3 transition-all hover:scale-105 hover:rounded-md motion-reduce:transition-none">
              Sign In
            </button>
          </SignInButton>
          <p>or</p>
          <SignInButton mode="modal">
            <button className="flex items-center justify-center bg-pink-700 px-12 py-3 transition-all hover:scale-105 hover:rounded-md motion-reduce:transition-none">
              Sign Up
            </button>
          </SignInButton>
        </div>
      </div>
    </section>
  );
}

export default TopSection;
