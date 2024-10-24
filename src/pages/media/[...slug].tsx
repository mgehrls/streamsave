import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import LayoutWrapper from "~/components/Layout/LayoutWrapper";
import { useUser } from "@clerk/nextjs";
import Loading from "~/components/Loading";
import Image from "next/image";
import { FaHeart, FaRegHeart, FaArrowLeft, FaStar } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import Link from "next/link";
import TagPill from "~/components/TagPill";
import { useEffect, useState } from "react";
import useListActions from "~/utils/useListActions";
import MediaRow from "~/components/MediaRow";
import type { MongoMedia } from "~/utils/types";
import { imageFromAPIBasePath } from "~/utils/constants";
import { genresFromAPI } from "~/utils/genres";

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

  const {
    addFavToList,
    addWatchLaterToList,
    removeFromList,
    changeWatchLaterValue,
    addingFav,
    addingWatchLater,
    removing,
    updating,
  } = useListActions();

  const {
    data: userList,
    // isLoading,
    // isError,
  } = api.listItem.getUserList.useQuery();

  const listItem = userList?.find((item) => item.media.id === id);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // function submitNewTag() {
  //   const newTagInput = document.getElementById("newTagInput") as HTMLInputElement;
  //   if (!newTagInput) return;
  //   if (newTagInput.value.length < 3) return;

  //   const enteredValue = newTagInput.value;

  //   // Check if the entered value exists in the list of options
  //   const options = document.getElementById("newTag") as HTMLDataListElement;
  //   if (!options) return;
  //   const optionExists = Array.from(options.options).some(
  //     (option) => option.value === enteredValue
  //   );

  //   if (optionExists) {
  //     console.log("Existing option selected:", enteredValue);
  //   } else {
  //     console.log("New option suggested:", enteredValue);
  //   }
  // }

  if (!isClient) return;

  if (!mediaFromAPI) return <div>404</div>;

  console.log("mediaFromAPI", mediaFromAPI);

  const objectToSend: {
    media: MongoMedia;
  } = {
    media: {
      id: mediaFromAPI.id,
      title: mediaFromAPI.title,
      type: mediaFromAPI.name ? "tv" : "movie",
      poster: mediaFromAPI.poster_path,
      backdrop: mediaFromAPI.backdrop_path,
      description: mediaFromAPI.overview,
      watchLater: false,
      tags: [],
    },
  };

  const genres: { id: number; name: string }[] = mediaFromAPI.genres.map(
    (genre) => {
      const tag = genresFromAPI.find((tag) => tag.id === genre.id);
      if (tag) {
        return tag;
      } else {
        return { id: 0, name: "" };
      }
    },
  );

  if (!user.isLoaded)
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-900 text-slate-50">
        <Loading />
      </div>
    );

  // todo: fix buttons here, will require button update

  return (
    <>
      <Head>
        <title>{`${mediaFromAPI.title}`}</title>
      </Head>
      <LayoutWrapper user={user}>
        <div className="relative w-full bg-zinc-800 text-white">
          <Link
            aria-label="Go back to home page."
            className="absolute left-2 flex h-16 w-16 items-center justify-center"
            href={"/"}
          >
            <FaArrowLeft size={32} />
          </Link>
          <div className="flex flex-col items-center justify-center pb-8 pt-16 sm:flex-row">
            {/* image */}
            <div className="flex w-full max-w-[300px] justify-center pb-8 sm:w-[50%] sm:pb-0 md:max-w-none">
              <Image
                src={
                  mediaFromAPI.poster_path
                    ? `${imageFromAPIBasePath}${mediaFromAPI.poster_path}`
                    : "/images/posterUnavailable.png"
                }
                alt=""
                width={800}
                height={400}
                className="w-4/5 border-2 border-black object-scale-down shadow-xl"
              />
            </div>
            {/* info */}
            <div className="flex flex-col justify-center px-4 sm:w-1/2 sm:flex-col-reverse">
              {/* buttons */}
              <div className="flex items-end gap-2 sm:pt-4">
                {listItem ? (
                  listItem.media.watchLater ? (
                    // in list, in watch later
                    <>
                      {!updating && (
                        <button
                          aria-label={`Change ${listItem.media.title} from something you want to watch later to a favorite of yours.`}
                          onClick={() =>
                            changeWatchLaterValue({
                              id: listItem._id as string,
                              watchLater: false,
                              lastSeen: "",
                            })
                          }
                          className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold"
                        >
                          <FaRegHeart size={20} />
                          <span className="hidden lg:block">Favorited</span>
                        </button>
                      )}
                      {updating && (
                        <div className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold">
                          <Loading />
                        </div>
                      )}
                      {!removing && (
                        <button
                          aria-label={`Remove ${listItem.media.title} from your list.`}
                          onClick={() => removeFromList(listItem._id as string)} // listItem.id
                          className="flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold"
                        >
                          <FaStar fill="green" size={20} />
                          <span className="sr-only">Interested</span>
                        </button>
                      )}
                      {removing && (
                        <div className="flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold">
                          <Loading />
                        </div>
                      )}
                      {mediaFromAPI.external_ids.imdb_id && (
                        <Link
                          aria-label={`Go to ${mediaFromAPI.title}'s IMDb page. Opens in a new tab.`}
                          target="_blank"
                          href={`https://www.imdb.com/title/${mediaFromAPI.external_ids.imdb_id}`}
                        >
                          <Image
                            src="/images/imdb.png"
                            alt="IMDB logo"
                            width={50}
                            height={80}
                          />
                        </Link>
                      )}
                    </>
                  ) : (
                    //in list, not watch later
                    <>
                      {!removing && (
                        <button
                          aria-label={`Remove ${listItem.media.title} from your list.`}
                          onClick={() => removeFromList(listItem._id as string)}
                          className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold"
                        >
                          <FaHeart fill="red" size={20} />
                          <span className="sr-only">Favorited</span>
                        </button>
                      )}
                      {removing && (
                        <div className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold">
                          <Loading />
                        </div>
                      )}
                      {mediaFromAPI.external_ids.imdb_id && (
                        <Link
                          aria-label={`Go to ${mediaFromAPI.title}'s IMDb page. Opens in a new tab.`}
                          target="_blank"
                          href={`https://www.imdb.com/title/${mediaFromAPI.external_ids.imdb_id}`}
                        >
                          <Image
                            src="/images/imdb.png"
                            alt="IMDB logo"
                            width={50}
                            height={80}
                          />
                        </Link>
                      )}
                    </>
                  )
                ) : (
                  // not in list
                  <div className="flex w-full items-center justify-between gap-2 md:items-end md:justify-start">
                    {!addingFav && (
                      <button
                        aria-label={`Add ${objectToSend.media.title} to your favorites list.`}
                        onClick={() => addFavToList(objectToSend)}
                        className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold"
                      >
                        <FaRegHeart size={20} />
                        <span className="">Favorited</span>
                      </button>
                    )}
                    {addingFav && (
                      <div className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold">
                        <Loading />
                      </div>
                    )}
                    {!addingWatchLater && (
                      <button
                        aria-label={`Add ${objectToSend.media.title} to your watch later list.`}
                        onClick={() => {
                          objectToSend.media.watchLater = true;
                          addWatchLaterToList(objectToSend);
                        }}
                        className="line-clamp-1 flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold"
                      >
                        <FaClockRotateLeft size={20} />
                        <span>Later</span>
                      </button>
                    )}
                    {addingWatchLater && (
                      <div className="flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold">
                        <Loading />
                      </div>
                    )}
                    {mediaFromAPI.external_ids.imdb_id && (
                      <Link
                        aria-label={`Go to ${mediaFromAPI.title}'s IMDb page. Opens in a new tab.`}
                        target="_blank"
                        href={`https://www.imdb.com/title/${mediaFromAPI.external_ids.imdb_id}`}
                      >
                        <Image
                          src="/images/imdb.png"
                          alt="IMDB logo"
                          width={60}
                          height={60}
                        />
                      </Link>
                    )}
                  </div>
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
                {listItem?.media.tags && listItem.media.tags.length > 0 && (
                  <div className="rounded-md bg-black p-2">
                    <h3 className="text-lg">Your Tags</h3>
                    <div className="flex flex-wrap gap-2 py-2">
                      {listItem.media.tags.map((genre) => {
                        return <TagPill key={genre.id} tag={genre} />;
                      })}
                      {/* {addTag && (
                        <>
                          <input
                            id="newTagInput"
                            pattern="[a-z\/-]+"
                            autoFocus
                            onSelect={() => console.log("selected")}
                            onKeyDown={(e) => console.log(e.key)}
                            className="w-28 rounded-md bg-slate-200 px-1 py-0.5 text-xs tracking-wider text-black"
                            list="newTag"
                          />
                          <datalist id="newTag">
                            {tags?.tags.map((tag) => {
                              if (
                                !listItem?.tags.find(
                                  (genre) => genre.id === tag.id,
                                )
                              ) {
                                return (
                                  <option
                                    onClick={() =>
                                      console.log("clicked on option")
                                    }
                                    key={tag.id}
                                    value={tag.name}
                                  />
                                );
                              }
                            })}
                          </datalist>
                          <button
                            onClick={() => {
                              console.log("add attempted");
                            }}
                          >
                            <FaPlus />
                          </button>
                        </>
                      )}
                      {!addTag && (
                        <button
                          className="flex items-center"
                          onClick={() => setAddTag(true)}
                        >
                          <TagPill
                            key={245}
                            tag={{ id: 0, name: "add tag... +" }}
                          />
                        </button>
                      )} */}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {mediaFromAPI.recommendations.results.length > 0 && (
            <MediaRow
              title={`More Like ${mediaFromAPI.title}`}
              bgColor="bg-zinc-600"
              listItems={userList}
              apiResult={mediaFromAPI.recommendations.results}
              // allTags={{tags:genresFromAPI}}
            />
          )}
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
