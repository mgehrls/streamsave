import { getAuth } from "@clerk/nextjs/server";
import { TRPCError, initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import { ZodError } from "zod";

import client from "~/server/db";

/**
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = (opts: CreateNextContextOptions) => {
  const {req} = opts;
  const session = getAuth(req);

  const userId = session?.userId ?? null;
  return {
    db: client,
    userId,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;

const enforceUserIsAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.userId) {
    throw new TRPCError({code: "UNAUTHORIZED", message: "You must be logged in to do that."});
  }
  return next({
    ctx: {
      userId: ctx.userId,
    }
  });
});

export const privateProcedure = t.procedure.use(enforceUserIsAuthenticated);
