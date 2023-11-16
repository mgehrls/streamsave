import { mDBRouter } from "~/server/api/routers/mDB";
import { createTRPCRouter } from "~/server/api/trpc";
import { dbRouter } from "./routers/db";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  mDB: mDBRouter,
  db: dbRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
