import Head from "next/head";
import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loading from "~/components/Loading";
import { api } from "~/utils/api";
import MediaRow from "~/components/MediaRow";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/a11y";
import LayoutWrapper from "~/components/LayoutWrapper";

export default function Home() {
  const user = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  if (!user.isLoaded)
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-900 text-slate-50">
        <Loading />
      </div>
    );

  return (
    <div className="min-w-screen flex flex-col items-center justify-center bg-black text-slate-50">
      <Head>
        <title>StreamSave</title>
        <meta
          name="description"
          content="Log in to make a list of your favorite shows and movies sorted and filtered however you want."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutWrapper>
        <>
          {user.isSignedIn && <Feed />}
          {!user.isSignedIn && user.isLoaded && (
            <>
              <TopSection />
              <MiddleSection />
              <BottomSection />
            </>
          )}
        </>
      </LayoutWrapper>
    </div>
  );
}

function Feed() {
  const {
    data: apiData,
    isLoading: trendingLoading,
    isError: trendingError,
  } = api.mDB.getTrending.useQuery();
  const {
    data: listData,
    isLoading,
    isError: listDataError,
  } = api.listItem.getUserList.useQuery();
  const {
    data: tags,
    isLoading: tagsLoading,
    isError: tagError,
  } = api.listItem.getAllTags.useQuery();

  if (trendingError) return <div>Error contacting api for trending data</div>;
  if (listDataError)
    return <div>Error contacting our database to find your list</div>;
  if (tagError) return <div>Error contacting our database for tags</div>;
  if (trendingLoading || isLoading || tagsLoading)
    return (
      <div className="flex min-h-[20rem] w-full items-center justify-center">
        <Loading />
      </div>
    );

  const { trendingShows, popularShows, popularMovies } = apiData;

  return (
    <div>
      {listData && (
        <MediaRow
          title={"Your List"}
          bgColor="bg-zinc-600"
          listItems={listData}
          allTags={tags}
        />
      )}
      <MediaRow
        title={"Trending Shows"}
        media={trendingShows}
        bgColor="bg-zinc-500"
        listItems={listData}
        allTags={tags}
      />
      <MediaRow
        title={"Popular Shows"}
        media={popularShows}
        bgColor="bg-zinc-600"
        listItems={listData}
        allTags={tags}
      />
      <MediaRow
        title={"Popular Movies"}
        media={popularMovies}
        bgColor="bg-zinc-500"
        listItems={listData}
        allTags={tags}
      />
    </div>
  );
}

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
