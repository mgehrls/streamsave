import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";



export const tagRouter = createTRPCRouter({
  getAllTags: publicProcedure
    .query(async ({ctx}) => {
      const {db} = ctx;
    const tags = await db.tag.findMany()
	return {tags}

    })
});