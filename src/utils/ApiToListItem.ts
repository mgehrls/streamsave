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
    const isExtended = typeIsExtended(media);
    const isMovie = isExtended && typeIsExtendedMovie(media) || !isExtended && typeIsMovie(media);
    return {
        id: media.id,
        title: isMovie ? media.title : media.name,
        type: isMovie ? "movie" : "tv",
        poster: media.poster_path,
        backdrop: media.backdrop_path,
        description: media.overview,
        tags: isExtended ? media.genres : media.genre_ids.map((genre) => {
          return {
            id: genre,
            name: genresFromAPI.find((tag) => tag.id === genre)?.name ?? "",
          }}),
    }

  }

// export const MultiApiToListItem = (mediaArray: APIResult[]) => {}