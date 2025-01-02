import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";

function BottomSection() {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-gradient-to-bl from-sky-600 via-sky-900 to-zinc-900 py-4 text-white md:px-12 lg:flex-row">
      <div className="flex w-full justify-evenly lg:w-1/2">
        <Image
          src="/images/mobile-list-view.png"
          alt="How the user's list looks on a mobile device"
          className="hidden py-12 md:block"
          width={260}
          height={336}
        />
        <Image
          src="/images/mobile-card-view.png"
          alt="How the user's list looks on a mobile device"
          className="py-12"
          width={260}
          height={336}
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-8 pb-16 lg:w-1/2">
        <div className="flex flex-col items-center gap-4 md:gap-8 lg:items-start">
          <h2 className="line-clamp-1 text-xl font-bold leading-normal tracking-wider md:text-3xl lg:text-4xl  lg:leading-relaxed">
            Organized How You Want
          </h2>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <SignInButton mode="modal">
              <button className="flex items-center justify-center bg-sky-600 px-12 py-3 transition-all hover:scale-105 hover:rounded-md motion-reduce:transition-none">
                Sign In
              </button>
            </SignInButton>
            <SignInButton mode="modal">
              <button className="flex items-center justify-center bg-pink-700 px-12 py-3 transition-all hover:scale-105 hover:rounded-md motion-reduce:transition-none">
                Sign Up
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BottomSection;
