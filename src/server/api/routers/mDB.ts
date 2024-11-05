
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { typeIsExtendedMovie } from "~/utils/ApiToListItem";
import type { ApiResponse, ExtendedApiResult } from "~/utils/types";

const API_KEY_SECRET = process.env.API_KEY_SECRET

const fetchPopularMovies = async ()=>{
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_SECRET}&language=en-US&adult=false`)
  const popularMoviesData = await res.json() as ApiResponse
  return popularMoviesData.results
}
const fetchTrendingShows = async ()=>{
  const res = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY_SECRET}&language=en-US&adult=false`)
  const trendingShowsData = await res.json() as ApiResponse
  return trendingShowsData.results
}
const fetchPopularShows = async ()=>{
const res = await fetch(` https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY_SECRET}&language=en-US&adult=false`)
const popularShowsData = await res.json() as ApiResponse
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
      const mediaData = await res.json() as ExtendedApiResult
      if (typeIsExtendedMovie(mediaData)){
        return mediaData
      } else {
        return mediaData
      }
    }),
  search: publicProcedure
    .input(z.object({query: z.string()}))
    .query(async ({input}: {input: {query:string}}) => {
      const {query} = input;
      const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY_SECRET}&language=en-US&query=${query}&page=1&include_adult=false`)
      const searchData = await res.json() as ApiResponse
      return searchData.results
    }),
});
