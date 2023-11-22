import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import LayoutWrapper from "~/components/LayoutWrapper";
import { useUser } from "@clerk/nextjs";
import Loading from "~/components/Loading";

const SinglePostPage: NextPage<{ type: string; id: number }> = ({
  type,
  id,
}) => {
  const { data } = api.mDB.getSingleMedia.useQuery({ type: type, id: id });
  const user = useUser();

  if (!data) return <div>404</div>;

  if (!user.isLoaded)
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-900 text-slate-50">
        <Loading />
      </div>
    );

  return (
    <>
      <Head>
        <title>{`${data.title}`}</title>
      </Head>
      <LayoutWrapper user={user}>
        <div>
          <h1>{data.title}</h1>
          <p>{data.overview}</p>
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
  if (slug.length && slug[1]) {
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
