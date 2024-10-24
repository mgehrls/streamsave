import { genresFromAPI } from "./genres"
import type { APIResult, MongoMedia, MovieAPIResult } from "./types"

export function typeIsMovie(media: APIResult): media is MovieAPIResult {
    return "title" in media;
}

export const SingleApiMediaToListItem : (media: APIResult) => MongoMedia = (media) => {
  console.log( media )
    if( typeIsMovie(media) ) {
        return {
            id: media.id,
            title: media.title,
            type: "movie",
            poster: media.poster_path,
            backdrop: media.backdrop_path,
            description: media.overview,
            tags: media.genre_ids.map((genre) => {
              return {
                id: genre,
                name: genresFromAPI.find((tag) => tag.id === genre)?.name ?? "",
              }})
        }
    }else{
        return {
            id: media.id,
            title: media.name,
            type: "tv",
            poster: media.poster_path,
            backdrop: media.backdrop_path,
            description: media.overview,
            tags: media.genre_ids.map((genre) => {
              return {
                id: genre,
                name: genresFromAPI.find((tag) => tag.id === genre)?.name ?? "",
              }})
        }
    }
  }

// export const MultiApiToListItem = (mediaArray: APIResult[]) => {}