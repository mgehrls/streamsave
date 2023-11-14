
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import type { APIResponse, MovieAPIResult, ShowAPIResult } from "~/utils/types";

const API_KEY_SECRET = process.env.API_KEY_SECRET

const fetchPopularMovies = async ()=>{
  const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY_SECRET}&language=en-US&adult=false`)
  const popularMoviesData = await res.json() as APIResponse
  return popularMoviesData.results as Array<MovieAPIResult>
}
const fetchTrendingShows = async ()=>{
  const res = await fetch(`https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY_SECRET}&language=en-US&adult=false`)
  const trendingShowsData = await res.json() as APIResponse
  const trendingShows = trendingShowsData.results as ShowAPIResult[]
  return trendingShows.map((result) => {
    return {...result, title:result.name}
  }) as Array<ShowAPIResult>
}
const fetchPopularShows = async ()=>{
const res = await fetch(` https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY_SECRET}&language=en-US&adult=false`)
const popularShowsData = await res.json() as APIResponse
const popularShows = popularShowsData.results as ShowAPIResult[]
return popularShows.map((result) => {
  return {...result, title:result.name}
}) as Array<ShowAPIResult>
}

export const mDBRouter = createTRPCRouter({
  getTrending: publicProcedure
    .query(async () => {
      const [popularMovies, trendingShows, popularShows] = await Promise.all([fetchPopularMovies(), fetchTrendingShows(), fetchPopularShows()])
	return {popularMovies, trendingShows, popularShows}

    })
});
