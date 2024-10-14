import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";

function TopSection() {
    return (
      <section className="flex h-full w-full flex-col gap-4 md:flex-row">
        <div className="flex h-full w-full items-center justify-center gap-2 px-12 py-16 md:py-20 lg:py-40">
          <Image
            priority
            src="/images/Streamsave.svg"
            alt="StreamSave Logo"
            width={1900}
            height={3330}
            className="h-auto w-32 object-fill lg:w-80"
          />
          <div className="flex h-full flex-col justify-center gap-2 p-2">
            <div>
              <h1 className="text-3xl font-bold tracking-wider lg:text-5xl">
                Streamsave
              </h1>
              <span className="text-sm text-slate-300">fill your show hole</span>
            </div>
  
            <SignInButton>
              <button className="flex items-center justify-center bg-pink-700 px-6 py-2 transition-all hover:scale-105 hover:rounded-md">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
  
        <div className="hidden w-full items-center justify-center bg-gradient-to-l from-sky-700 to-transparent py-20 md:flex lg:w-2/3 lg:justify-start lg:py-40 lg:pl-12">
          <p className="w-48 text-center font-bold tracking-wider">
            Organize your favorite shows and movies, or discover new ones!
          </p>
        </div>
      </section>
    );
  }

  export default TopSection;