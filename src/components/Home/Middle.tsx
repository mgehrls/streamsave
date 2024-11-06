import DisplayOnlyMediaCard from "../DisplayOnlyMediaCard";
import { imageFromAPIBasePath } from "~/utils/constants";

function MiddleSection() {
  return (
    <section className="flex w-full flex-col items-center justify-end bg-gradient-to-br from-pink-700 via-pink-900 to-zinc-900 px-8 py-16 text-white md:py-24">
      <h2 className="line-clamp-2 text-center text-3xl font-bold leading-normal tracking-wider md:text-4xl">
        Your Favorite Shows & Movies
      </h2>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2 md:mt-16 md:gap-8 lg:gap-16">
        <DisplayOnlyMediaCard
          posterPath={`${imageFromAPIBasePath}/t/p/w500/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg`}
        />
        <DisplayOnlyMediaCard
          posterPath={`${imageFromAPIBasePath}/t/p/w500/7DJKHzAi83BmQrWLrYYOqcoKfhR.jpg`}
        />
        <DisplayOnlyMediaCard
          posterPath={`${imageFromAPIBasePath}/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg`}
        />
        <DisplayOnlyMediaCard
          posterPath={`${imageFromAPIBasePath}/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg`}
        />
      </div>
    </section>
  );
}

export default MiddleSection;
