import { genresFromAPI } from "./genres"
import type { APIResult, MongoMedia, MovieAPIResult, SingleMediaAPIUnity, SingleMovieAPIResponse } from "./types"

export function typeIsExtended(media : APIResult | SingleMediaAPIUnity): media is SingleMediaAPIUnity {
    return "recommendations" in media;
}

export function typeIsExtendedMovie(media: SingleMediaAPIUnity): media is SingleMovieAPIResponse {
    return 'budget' in media;
}

export function typeIsMovie(media: APIResult): media is MovieAPIResult {
    return "title" in media;
}

export const SingleApiMediaToListItem : (media: APIResult | SingleMediaAPIUnity) => MongoMedia = (media) => {
  if( typeIsExtended(media) ) {
    if( typeIsExtendedMovie(media) ) {
        return {
            id: media.id,
            title: media.title,
            type: "movie",
            poster: media.poster_path,
            backdrop: media.backdrop_path,
            description: media.overview,
            tags: media.genres
        }
    }else{
        return {
            id: media.id,
            title: media.name,
            type: "tv",
            poster: media.poster_path,
            backdrop: media.backdrop_path,
            description: media.overview,
            tags: media.genres
        }
    }
  }else if( typeIsMovie(media) ) {
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