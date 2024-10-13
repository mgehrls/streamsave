import Image from "next/image";

function MiddleSection() {
    return (
      <section className="flex w-full flex-col items-center justify-end bg-gradient-to-tr from-pink-700 via-pink-900 to-zinc-900 px-8 py-16 text-white">
        <div className="flex flex-shrink items-center justify-center gap-2 py-8 md:gap-8 lg:gap-16">
          <Image
            className="h-auto w-[30%] md:w-40"
            src="/images/BreakingBad.png"
            alt=""
            width={144}
            height={290}
          />
          <Image
            className="h-auto w-[30%] md:w-40"
            src="/images/TheOffice.png"
            alt=""
            width={144}
            height={290}
          />
          <Image
            className="h-auto w-[30%] md:w-40"
            src="/images/TheLastOfUs.png"
            alt=""
            width={144}
            height={290}
          />
        </div>
        <h2 className="line-clamp-2 text-center text-xl font-bold leading-normal tracking-wider md:text-3xl lg:text-4xl">
          Your Favorite Shows & Movies
        </h2>
      </section>
    );
  }

  export default MiddleSection;