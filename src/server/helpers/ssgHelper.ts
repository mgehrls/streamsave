import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";


export const generateSSGHelper= () => {
    const ssg = createServerSideHelpers({
      router: appRouter,
      ctx: { db, userId: null },
      transformer: superjson, // optional - adds superjson serialization
    });
  
    return ssg;}