
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { APIResponse, APIResult, Media, SingleMediaAPIUnity } from "~/utils/types";

const API_KEY_SECRET = process.env.API_KEY_SECRET

const fetchPopularMovies = async ()=>{
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_SECRET}&language=en-US&adult=false`)
  const popularMoviesData = await res.json() as APIResponse
  return popularMoviesData.results.map((result) => {
    return {id: result.id, title:result.title, type:"movie", poster:result.poster_path, backdrop:result.backdrop_path, description:result.overview, genres:result.genre_ids}
  }) as Array<Media>
}
const fetchTrendingShows = async ()=>{
  const res = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY_SECRET}&language=en-US&adult=false`)
  const trendingShowsData = await res.json() as APIResponse
  const trendingShows = trendingShowsData.results as APIResult[]
  return trendingShows.map((result) => {
    return {id:result.id, title:result.name, type:"tv", poster:result.poster_path, backdrop:result.backdrop_path, description:result.overview, genres:result.genre_ids}
  }) as Array<Media>
}
const fetchPopularShows = async ()=>{
const res = await fetch(` https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY_SECRET}&language=en-US&adult=false`)
const popularShowsData = await res.json() as APIResponse
const popularShows = popularShowsData.results as APIResult[]
return popularShows.map((result) => {
  return {id:result.id, title:result.name, type:"tv", poster:result.poster_path, backdrop:result.backdrop_path, description:result.overview, genres:result.genre_ids}
}) as Array<Media>
}

export const mDBRouter = createTRPCRouter({
  getTrending: publicProcedure
    .query(async () => {
      const [popularMovies, trendingShows, popularShows] = await Promise.all([fetchPopularMovies(), fetchTrendingShows(), fetchPopularShows()])
	return {popularMovies, trendingShows, popularShows}

    }),
  getSingleMedia: publicProcedure
    .input(z.object({type: z.string(), id: z.number()}))
    .query(async ({input}: {input: {type:string, id:number}}) => {
      const {type, id} = input;
      const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY_SECRET}&language=en-US&adult=false&append_to_response=recommendations,external_ids,images`)
      const mediaData = await res.json() as SingleMediaAPIUnity
      return {...mediaData, title: mediaData.name || mediaData.title}
    })
});
