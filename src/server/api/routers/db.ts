/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { useUser } from "@clerk/nextjs";
import { z } from "zod";

export const dbRouter = createTRPCRouter({
    getUserList: publicProcedure 
        .query(async ({ ctx }) => {
            const currentUser = useUser();
           const { db } = ctx;
           const userList = await db.listItem.findMany({
                where:{
                     userId: currentUser?.user?.id ?? "0"
                }
              }).catch((err: string | undefined)=>{
                    throw new Error(err);
                })
                return userList;
           }),
    addListItem: publicProcedure
           .input(z.object({media: z.object({id: z.string(), title: z.string(), poster: z.string(), type: z.string(), backdrop: z.string(), description:z.string()})}))
           .query(({ ctx, input }) => {
            const currentUser = useUser();
            console.log(input);
            console.log(currentUser);
        }),

});