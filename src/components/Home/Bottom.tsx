import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";

function BottomSection() {
    return (
      <section className="flex w-full items-center justify-center bg-gradient-to-bl from-sky-600 via-sky-900 to-zinc-900 px-12 py-4 text-white">
        <div className="flex w-2/3 flex-col items-start justify-center gap-8">
          <h2 className="line-clamp-3 w-[13ch] text-xl font-bold leading-normal tracking-wider md:w-[17ch] md:text-3xl lg:text-4xl  lg:leading-relaxed">
            Organized The Way You Want
          </h2>
          <SignInButton>
            <button className="flex items-center justify-center bg-pink-700 px-6 py-2 transition-all hover:scale-105 hover:rounded-md">
              Sign In
            </button>
          </SignInButton>
        </div>
        <div className="h-auto w-1/2">
          <Image
            src="/images/mobile-list.png"
            alt="How the user's list looks on a mobile device"
            className="py-12"
            width={260}
            height={336}
          />
        </div>
      </section>
    );
  }

  export default BottomSection;