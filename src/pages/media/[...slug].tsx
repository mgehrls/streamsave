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
        <div className="relative w-full px-4">
          <Link href={"/"}>
            <FaArrowLeft className="absolute left-6 top-6" size={32} />
          </Link>
          <FaSearch className="absolute right-6 top-6" size={32} />
          <div className="flex w-full justify-center pb-8 pt-16">
            <Image
              src={`${basePath}${mediaFromAPI.poster_path}`}
              alt=""
              width={500}
              height={264}
              className="w-3/5 object-scale-down"
            />
          </div>
          <div className="flex justify-between">
            {listItem ? (
              listItem.watchLater ? (
                // in list, in watch later
                <>
                  <button className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold">
                    <FaRegHeart size={20} />
                    Favorited
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold">
                    <FaClockRotateLeft size={20} />
                    Watch Later
                  </button>
                </>
              ) : (
                //in list, not watch later
                <button className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold">
                  <FaHeart fill="red" size={20} />
                  Favorited
                </button>
              )
            ) : (
              // not in list
              <>
                <button className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold">
                  <FaRegHeart size={20} />
                  Favorited
                </button>
                <button className="flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold">
                  <FaClockRotateLeft size={20} />
                  Watch Later
                </button>
              </>
            )}
          </div>
          <h1 className="pt-4 text-2xl font-semibold tracking-wide">
            {mediaFromAPI.title}
          </h1>
          <div>
            {genres.map((genre) => {
              return <TagPill key={genre.id} tag={genre} />;
            })}
          </div>
          <p className="pt-2 tracking-wider">{mediaFromAPI.overview}</p>
        </div>
      </LayoutWrapper>
    </>
  );
};

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
