
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { APIResponse, SingleMediaAPIUnity, SingleMovieAPIResponse, SingleShowAPIResponse } from "~/utils/types";

const API_KEY_SECRET = process.env.API_KEY_SECRET

const fetchPopularMovies = async ()=>{
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_SECRET}&language=en-US&adult=false`)
  const popularMoviesData = await res.json() as APIResponse
  return popularMoviesData.results
}
const fetchTrendingShows = async ()=>{
  const res = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY_SECRET}&language=en-US&adult=false`)
  const trendingShowsData = await res.json() as APIResponse
  return trendingShowsData.results
}
const fetchPopularShows = async ()=>{
const res = await fetch(` https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY_SECRET}&language=en-US&adult=false`)
const popularShowsData = await res.json() as APIResponse
return popularShowsData.results

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
      if ( type === 'movie' ) {
        return mediaData as SingleMovieAPIResponse
      }else{
        return mediaData as SingleShowAPIResponse
      }
    }),
  search: publicProcedure
    .input(z.object({query: z.string()}))
    .query(async ({input}: {input: {query:string}}) => {
      const {query} = input;
      const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY_SECRET}&language=en-US&query=${query}&page=1&include_adult=false`)
      const searchData = await res.json() as APIResponse
      return searchData.results
    }),
});
