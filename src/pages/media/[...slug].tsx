import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import LayoutWrapper from "~/components/LayoutWrapper";
import { useUser } from "@clerk/nextjs";
import Loading from "~/components/Loading";
import Image from "next/image";
import { FaHeart, FaRegHeart, FaArrowLeft, FaSearch } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import Link from "next/link";
import TagPill from "~/components/TagPill";
import { useEffect, useState } from "react";
import useListActions from "~/utils/useListActions";
import MediaRow from "~/components/MediaRow";
import type { Media } from "~/utils/types";

const SinglePostPage: NextPage<{ type: string; id: number }> = ({
  type,
  id,
}) => {
  const [isClient, setIsClient] = useState(false);
  const user = useUser();
  const { data: mediaFromAPI } = api.mDB.getSingleMedia.useQuery({
    type: type,
    id: id,
  });
  //   const {  addFavToList, addWatchLaterToList, removeFromList, updateListItem, addingFav, addingWatchLater, removing, updating} = useListActions();

  const {
    data: userList,
    isLoading,
    isError,
  } = api.listItem.getUserList.useQuery();
  const {
    data: tags,
    isLoading: tagsLoading,
    isError: tagError,
  } = api.tags.getAllTags.useQuery();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  console.log(mediaFromAPI);

  const basePath = "https://image.tmdb.org/t/p/w500";

  if (!mediaFromAPI) return <div>404</div>;

  const genres: { id: number; name: string }[] = mediaFromAPI.genres.map(
    (genre) => {
      const tag = tags?.tags.find((tag) => tag.id === genre.id);
      if (tag) {
        return tag;
      } else {
        return { id: 0, name: "" };
      }
    },
  );
  const listItem = userList?.find((item) => item.media.id === id);

  if (!user.isLoaded || isLoading || tagsLoading)
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-900 text-slate-50">
        <Loading />
      </div>
    );

  if (isError || tagError)
    throw Error("Error fetching data, please try again.");

  console.log(mediaFromAPI);

  return (
    <>
      <Head>
        <title>{`${mediaFromAPI.title}`}</title>
      </Head>
      <LayoutWrapper user={user}>
        <div className="relative w-full">
          <Link href={"/"}>
            <FaArrowLeft className="absolute left-6 top-6" size={32} />
          </Link>
          <FaSearch className="absolute right-6 top-6" size={32} />
          <div className="flex flex-col items-center justify-center pb-8 pt-16 sm:flex-row">
            {/* image */}
            <div className="flex w-full max-w-[300px] justify-center pb-8 sm:w-[50%] sm:pb-0 md:max-w-none">
              <Image
                src={`${basePath}${mediaFromAPI.poster_path}`}
                alt=""
                width={800}
                height={400}
                className="w-4/5 object-scale-down"
              />
            </div>
            {/* info */}
            <div className="flex flex-col justify-center px-4 sm:w-1/2 sm:flex-col-reverse">
              {/* buttons */}
              <div className="flex items-end gap-2 sm:pt-4">
                {listItem ? (
                  listItem.watchLater ? (
                    // in list, in watch later
                    <>
                      <button className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold">
                        <FaRegHeart size={20} />
                        <span className="hidden lg:block">Favorited</span>
                      </button>
                      <button className="flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold">
                        <FaClockRotateLeft size={20} />
                        <span className="hidden lg:block">Watch Later</span>
                      </button>
                      {mediaFromAPI.external_ids.imdb_id && (
                        <Link
                          href={`https://www.imdb.com/title/${mediaFromAPI.external_ids.imdb_id}`}
                        >
                          <Image
                            src="/images/imdb.png"
                            alt=""
                            width={50}
                            height={80}
                          />
                        </Link>
                      )}
                    </>
                  ) : (
                    //in list, not watch later
                    <>
                      <button className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold">
                        <FaHeart fill="red" size={20} />
                        <span>Favorited</span>
                      </button>
                      {mediaFromAPI.external_ids.imdb_id && (
                        <Link
                          href={`https://www.imdb.com/title/${mediaFromAPI.external_ids.imdb_id}`}
                        >
                          <Image
                            src="/images/imdb.png"
                            alt=""
                            width={50}
                            height={80}
                          />
                        </Link>
                      )}
                    </>
                  )
                ) : (
                  // not in list
                  <>
                    <button className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold">
                      <FaRegHeart size={20} />
                      <span className="hidden lg:block">Favorited</span>
                    </button>
                    <button className="line-clamp-1 flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold">
                      <FaClockRotateLeft size={20} />
                      <span className="line-clamp-1 hidden lg:block">
                        Watch Later
                      </span>
                    </button>
                    {mediaFromAPI.external_ids.imdb_id && (
                      <Link
                        href={`https://www.imdb.com/title/${mediaFromAPI.external_ids.imdb_id}`}
                      >
                        <Image
                          src="/images/imdb.png"
                          alt=""
                          width={50}
                          height={80}
                        />
                      </Link>
                    )}
                  </>
                )}
              </div>

              {/* text area */}
              <div className="max-w-[425px]">
                <h1 className="pt-4 text-2xl font-semibold tracking-wide md:text-4xl">
                  {mediaFromAPI.title}
                </h1>
                <div className="flex gap-2 py-2">
                  {genres.map((genre) => {
                    return <TagPill key={genre.id} tag={genre} />;
                  })}
                </div>
                <p className="py-4 tracking-wider">
                  {mediaFromAPI.overview.length > 200
                    ? `${mediaFromAPI.overview.slice(0, 200).trim()}...`
                    : mediaFromAPI.overview}
                </p>
                {listItem?.tags?.length && listItem.tags.length > 0 && (
                  <div className="bg-black p-2">
                    <h3 className="text-lg">Your Tags</h3>
                    <div className="flex gap-2 py-2">
                      {listItem.tags.map((genre) => {
                        return <TagPill key={genre.id} tag={genre} />;
                      })}
                      <TagPill
                        key={245}
                        tag={{ id: 0, name: "add tag... +" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {mediaFromAPI.recommendations.results.length > 0 && (
            <MediaRow
              title={`
              Shows like ${mediaFromAPI.title}`}
              bgColor="bg-zinc-800"
              listItems={userList}
              media={mediaFromAPI.recommendations.results.map((result) => {
                return {
                  id: result.id,
                  title: result.name ?? result.title,
                  type: result.name ? "tv" : "movie",
                  poster: result.poster_path,
                  backdrop: result.backdrop_path,
                  description: result.overview,
                  genres: result.genre_ids,
                } as Media;
              })}
              allTags={tags}
            />
          )}
        </div>
      </LayoutWrapper>
    </>
  );
};

// id: number;
// title: string;
// type: string;
// poster: string;
// backdrop: string;
// description: string;
// createdAt?: Date | undefined;
// genres?: number[] | undefined;

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.slug;
  let type: string | undefined;
  let id: number | undefined;

  if (!slug) throw Error("slug is undefined");
  if (!Array.isArray(slug)) {
    type = slug;
  }
  if (slug?.[1]) {
    type = slug[0];
    id = parseInt(slug[1]);
  }
  if (typeof id !== "number") throw Error("id is not a number");
  if (!type) throw Error("type is undefined");

  await ssg.mDB.getSingleMedia.prefetch({ type: type, id: id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      type,
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
