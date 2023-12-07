/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";
import type { Prisma } from "@prisma/client";

export const listItemRouter = createTRPCRouter({
    getUserList: privateProcedure 
        .query(async ({ ctx }) => {
           const { db } = ctx;
           const userList = await db.listItem.findMany({
                where:{
                     userId: ctx.userId
                },
                include:{
                    media:true,
                    tags:true
                }
              }).catch((err: string | undefined)=>{
                    throw new Error(err);
                })
                return userList;
           }),
    addListItem: privateProcedure
           .input(z.object({media: z.object({id: z.number(), title: z.string(), poster: z.string(), type: z.string(), backdrop: z.string(), description:z.string(), watchLater: z.boolean(), tags: z.array(z.number())})}))
           .mutation(async ({ ctx, input }) => {
            const {media} = input;
            const tags = media.tags.map((tagId)=>{ return {id: tagId}})
            const listItem: Prisma.ListItemCreateInput = {
                userId: ctx.userId,
                lastSeen: "",
                watchLater: media.watchLater,
                tags: {
                    connect: tags
                },
                media: {
                    connectOrCreate: {
                        where: {
                            id: media.id
                        },
                        create: {
                            id: media.id,
                            title: media.title,
                            poster: media.poster,
                            type: media.type,
                            backdrop: media.backdrop,
                            description: media.description,
                        }
                    }
                }
            }
            await ctx.db.listItem.create({
                data: listItem
                }).catch((err: string | undefined)=>{
                throw new Error(err);
            })
        }),
    deleteListItem: privateProcedure
        .input(z.object({id: z.string()}))
        .mutation(async ({ ctx, input }) => {
            const {id} = input;
            await ctx.db.listItem.delete({
                where: {
                    id: id
                }
            }).catch((err: string | undefined)=>{
                throw new Error(err);
            })
        }),
    changeWatchLaterValue: privateProcedure
        .input(z.object({id: z.string(), lastSeen: z.string(), watchLater: z.boolean()}))
        .mutation(async ({ ctx, input }) => {
            const {id, lastSeen, watchLater} = input;
            await ctx.db.listItem.update({
                where: {
                    id: id
                },
                data: {
                    lastSeen: lastSeen,
                    watchLater: watchLater
                }
            }).catch((err: string | undefined)=>{
                throw new Error(err);
            })
        }),
    addNewTag: privateProcedure
        .input(z.object({name: z.string().toLowerCase().min(3).max(12)}))
        .mutation(async ({ ctx, input }) => {
            const {name} = input;
            await ctx.db.tag.create({
                data: {
                    name: name
                }
            }).catch((err: string | undefined)=>{
                throw new Error(err);
            })
        }),
    addTagById: privateProcedure
        .input(z.object({id: z.string(), tagId: z.number()}))
        .mutation(async ({ ctx, input }) => {
            const {id, tagId} = input;
            await ctx.db.listItem.update({
                where: {
                    id: id
                },
                data: {
                    tags: {
                        connect: {
                            id: tagId
                        }
                    }
                }
            }).catch((err: string | undefined)=>{
                throw new Error(err);
            })
        }),
});