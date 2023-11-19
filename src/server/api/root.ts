import { mDBRouter } from "~/server/api/routers/mDB";
import { createTRPCRouter } from "~/server/api/trpc";
import { listItemRouter } from "./routers/listItem";
import { tagRouter } from "./routers/tag";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  mDB: mDBRouter,
  listItem: listItemRouter,
  tags: tagRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
