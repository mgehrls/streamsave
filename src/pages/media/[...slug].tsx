import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import LayoutWrapper from "~/components/Layout/LayoutWrapper";
import { useUser } from "@clerk/nextjs";
import Loading from "~/components/Loading";
import Image from "next/image";
import Link from "next/link";
import TagPill from "~/components/TagPill";
import { useEffect, useState } from "react";
import useListActions from "~/utils/useListActions";
import MediaRow from "~/components/MediaRow";
import type { APIResult, MongoMedia } from "~/utils/types";
import { imageFromAPIBasePath } from "~/utils/constants";
import { genresFromAPI } from "~/utils/genres";
import FavoriteButton from "~/components/Buttons/FavoriteButton";
import WatchLaterButton from "~/components/Buttons/WatchLaterButton";
import DestructiveModal from "~/components/Modals/DestructiveModal";
import { SingleApiMediaToListItem } from "~/utils/ApiToListItem";

const SinglePostPage: NextPage<{ type: string; id: number }> = ({
  type,
  id,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [confirmDeletion, setConfirmDeletion] = useState(false);
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

  const media: MongoMedia = SingleApiMediaToListItem(mediaFromAPI);

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

  // todo: fix buttons here, will require button update.
  // todo: remove buttons don't confirm deletion yet.

  return (
    <>
      <Head>
        <title>{`${media.title}`}</title>
      </Head>
      <LayoutWrapper user={user}>
        <div className="relative w-full bg-zinc-800 text-white">
          <div className="flex flex-col items-center justify-center pb-8 pt-16 sm:flex-row">
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

            <div className="flex flex-col justify-center px-4 sm:w-1/2 sm:flex-col-reverse">
              {/* buttons */}
              <div className="flex items-end gap-2 sm:pt-4">
                <DestructiveModal
                  open={confirmDeletion}
                  onClose={() => setConfirmDeletion(false)}
                  onConfirmation={() => {
                    if (listItem) removeFromList(listItem._id as string);
                    setConfirmDeletion(false);
                  }}
                  mediaTitle={media.title}
                />
                <FavoriteButton
                  addingFav={addingFav}
                  addFav={() => {
                    addFavToList({ media });
                  }}
                  updating={updating}
                  changeWatchLaterToFav={() => {
                    if (listItem?._id)
                      changeWatchLaterValue({
                        id: listItem._id as string,
                        watchLater: false,
                        lastSeen: "",
                      });
                  }}
                  removing={removing}
                  removeFav={() => setConfirmDeletion(true)}
                  listItemId={listItem ? (listItem._id as string) : undefined}
                  isWatchLater={listItem?.media.watchLater ?? false}
                  mediaTitle={media.title}
                  slugPage
                />
                <WatchLaterButton
                  addingWatchLater={addingWatchLater}
                  addWatchLater={() => {
                    media.watchLater = true;
                    addWatchLaterToList({ media });
                  }}
                  removing={removing}
                  removeWatchLater={() => setConfirmDeletion(true)}
                  listItemId={listItem ? (listItem._id as string) : undefined}
                  isWatchLater={listItem?.media.watchLater ?? false}
                  mediaTitle={media.title}
                />
                {mediaFromAPI.external_ids.imdb_id && (
                  <Link
                    aria-label={`Go to ${media.title}'s IMDb page. Opens in a new tab.`}
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

              {/* text area */}
              <div className="max-w-[425px]">
                <h1 className="pt-4 text-2xl font-semibold tracking-wide md:text-4xl">
                  {media.title}
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
              title={`More Like ${media.title}`}
              bgColor="bg-zinc-600"
              listItems={userList}
              apiResult={mediaFromAPI.recommendations.results as APIResult[]}
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
