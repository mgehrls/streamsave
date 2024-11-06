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
        <div className="mt-4">
          <span className="text-sm font-bold tracking-wider text-slate-300">
            Fill Your Show Hole
          </span>
          <h1 className="flex-shrink text-3xl font-medium md:text-5xl">
            Streamsave
          </h1>
          <SignInButton mode="modal">
            <button className="mt-6 flex items-center justify-center bg-pink-700 px-12 py-2 transition-all hover:scale-105 hover:rounded-md motion-reduce:transition-none">
              Sign In
            </button>
          </SignInButton>
        </div>
      </div>
      <div className="flex w-full items-center justify-center bg-gradient-to-t from-sky-700 to-transparent py-20 lg:w-1/3 lg:justify-start lg:bg-gradient-to-l lg:py-40 lg:pl-12">
        <p className="w-48 text-center font-bold tracking-wider">
          Organize your favorite shows and movies, or discover new ones!
        </p>
      </div>
    </section>
  );
}

export default TopSection;
