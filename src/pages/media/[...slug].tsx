import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import LayoutWrapper from "~/components/LayoutWrapper";
import { useUser } from "@clerk/nextjs";
import Loading from "~/components/Loading";
import Image from "next/image";
import {
  FaHeart,
  FaRegHeart,
  FaArrowLeft,
  FaStar,
  FaPlus,
} from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import Link from "next/link";
import TagPill from "~/components/TagPill";
import { useEffect, useState } from "react";
import useListActions from "~/utils/useListActions";
import MediaRow from "~/components/MediaRow";
import type { Media } from "~/utils/types";
import { imageFromAPIBasePath } from "~/utils/constants";

const SinglePostPage: NextPage<{ type: string; id: number }> = ({
  type,
  id,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [addTag, setAddTag] = useState(false);
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
    addNewTag,
    addTagById,
    addingFav,
    addingWatchLater,
    removing,
    updating,
    addingExistingTag,
    addingNewTag,
  } = useListActions();

  const {
    data: userList,
    isLoading,
    isError,
  } = api.listItem.getUserList.useQuery();
  const {
    data: tags,
    isLoading: tagsLoading,
    isError: tagError,
  } = api.listItem.getAllTags.useQuery();

  const listItem = userList?.find((item) => item.media.id === id);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return;

  if (!mediaFromAPI) return <div>404</div>;

  const objectToSend: {
    media: {
      id: number;
      type: string;
      title: string;
      poster: string;
      backdrop: string;
      description: string;
      watchLater: boolean;
      tags: number[];
    };
  } = {
    media: {
      id: mediaFromAPI.id,
      type: type,
      title: mediaFromAPI.title,
      poster: mediaFromAPI.poster_path,
      backdrop: mediaFromAPI.backdrop_path,
      description: mediaFromAPI.overview,
      watchLater: listItem?.watchLater ?? false,
      tags: [],
    },
  };

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

  if (!user.isLoaded || isLoading || tagsLoading)
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-900 text-slate-50">
        <Loading />
      </div>
    );

  if (isError || tagError)
    throw Error("Error fetching data, please try again.");

  function handleSubmitNewTag() {
    const newTagInput = document.getElementById(
      "newTagInput",
    ) as HTMLInputElement;
    if (!newTagInput) return;
    if (newTagInput.value.length < 3) return;

    const enteredValue = newTagInput.value;

    // Check if the entered value exists in the list of options
    const options = document.getElementById("newTag") as HTMLDataListElement;
    if (!options) return;
    const selectedOption = Array.from(options.options).find(
      (option) => option.value === enteredValue,
    );

    if (selectedOption) {
      if (listItem)
        addTagById({ tagId: parseInt(selectedOption.id), id: listItem.id });
    } else {
      if (listItem) addNewTag({ name: enteredValue, listItemId: listItem.id });
    }
  }

  return (
    <>
      <Head>
        <title>{`${mediaFromAPI.title}`}</title>
      </Head>
      <LayoutWrapper user={user}>
        <div className="relative w-full bg-zinc-800">
          <Link
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
                    : "/images/posterunavailable.png"
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
                  listItem.watchLater ? (
                    // in list, in watch later
                    <>
                      {!updating && (
                        <button
                          onClick={() =>
                            changeWatchLaterValue({
                              id: listItem.id,
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
                          onClick={() => removeFromList({ id: listItem.id })}
                          className="flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold"
                        >
                          <FaStar fill="green" size={20} />
                          <span className="hidden lg:block">Interested</span>
                        </button>
                      )}
                      {removing && (
                        <div className="flex items-center justify-center gap-2 rounded-md bg-pink-600 px-8 py-4 text-lg font-semibold">
                          <Loading />
                        </div>
                      )}
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
                      {!removing && (
                        <button
                          onClick={() => removeFromList({ id: listItem.id })}
                          className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold"
                        >
                          <FaHeart fill="red" size={20} />
                          <span>Favorited</span>
                        </button>
                      )}
                      {removing && (
                        <div className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold">
                          <Loading />
                        </div>
                      )}
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
                  <div className="flex w-full items-center justify-between gap-2 md:items-end md:justify-start">
                    {!addingFav && (
                      <button
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
                        href={`https://www.imdb.com/title/${mediaFromAPI.external_ids.imdb_id}`}
                      >
                        <Image
                          src="/images/imdb.png"
                          alt=""
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
                {listItem?.tags && listItem.tags.length > 0 && (
                  <div className="rounded-md bg-black p-2">
                    <h3 className="text-lg">Your Tags</h3>
                    <div className="flex flex-wrap gap-2 py-2">
                      {listItem.tags.map((genre) => {
                        return <TagPill key={genre.id} tag={genre} />;
                      })}
                      {addTag && (
                        <>
                          <input
                            id="newTagInput"
                            pattern="[a-z\/-]+"
                            autoFocus
                            onSelect={() => console.log("selected")}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleSubmitNewTag();
                              }
                              if (e.key === "Escape") {
                                setAddTag(false);
                              }
                            }}
                            className="w-28 rounded-md bg-slate-200 px-1 py-0.5 text-xs tracking-wider text-black"
                            list="newTag"
                          />
                          <datalist id="newTag">
                            {/* go through tags and map the ones that aren't genres on this list item and returns an option with all tags not in the genre list */}
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
                                    id={tag.id.toString()}
                                    value={tag.name}
                                  />
                                );
                              }
                            })}
                          </datalist>
                          {addingExistingTag || addingNewTag ? (
                            <div className="flex items-center justify-center gap-2 rounded-md bg-sky-600 px-8 py-4 text-lg font-semibold">
                              <Loading />
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                handleSubmitNewTag();
                              }}
                            >
                              <FaPlus />
                            </button>
                          )}
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
                      )}
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
