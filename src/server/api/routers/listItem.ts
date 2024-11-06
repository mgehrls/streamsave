import { createTRPCRouter, privateProcedure } from "~/server/api/trpc";
import { z } from "zod";
import type { MongoListItem } from "~/utils/types";
import { ObjectId } from "mongodb";


export const listItemRouter = createTRPCRouter({
    getUserList: privateProcedure 
        .query(async ({ ctx }) => {
           const { db, userId } = ctx;
           const collection = db.db('streamsave').collection<MongoListItem>('listItem');
           const userList = await collection.find({userId: userId}).toArray();
            return userList;
           }),
    addListItem: privateProcedure
        .input(z.object({media: z.object({id: z.number(), title: z.string(), poster: z.string(), type: z.string(), backdrop: z.string().nullable(), description:z.string(), watchLater: z.boolean().optional(), tags: z.array(z.object({id: z.number(), name: z.string()}))})}))
           .mutation(async ({ ctx, input }) => {
            const { db, userId} = ctx;
            const {media} = input;
            const listItem : MongoListItem = {
                userId: userId,
                createdAt: new Date(),
                media: { 
                    watchLater: media.watchLater,
                    id: media.id,
                    title: media.title,
                    type: media.type === 'tv' ? 'tv' : 'movie',
                    poster: media.poster,
                    backdrop: media.backdrop,
                    description: media.description,
                    tags: media.tags,
                }
            }
            await db.db('streamsave').collection<MongoListItem>('listItem').insertOne(listItem).catch((err: string | undefined)=>{
                throw new Error(err);
            });
        }),
    deleteListItem: privateProcedure
        .input(z.string())
        .mutation(async ({ ctx, input }) => {
            console.log('input', input);
            const { db } = ctx;
            await db.db('streamsave').collection<MongoListItem>('listItem').deleteOne({ _id: new ObjectId(input) }).catch((err: string | undefined)=>{
                throw new Error(err);
            });
        }),
    changeWatchLaterValue: privateProcedure
        .input(z.object({id: z.string(), lastSeen: z.string(), watchLater: z.boolean()}))
        .mutation(async ({ ctx, input }) => {
            const {id, lastSeen, watchLater} = input;
            const { db } = ctx;
            const result = await db.db('streamsave').collection<MongoListItem>('listItem').updateOne({_id: new ObjectId(id)}, {$set: { 'media.watchLater': watchLater, 'media.lastSeen': lastSeen }}).catch((err: string | undefined)=>{
                throw new Error(err);
            });
            console.log('result', result);
        }),
});