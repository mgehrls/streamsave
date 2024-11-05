import { genresFromAPI } from "./genres"
import type { ApiResult, ExtendedApiResult, ExtendedMovieApiResult, MongoMedia, MovieApiResult } from "./types"

export function typeIsExtended(media : ApiResult | ExtendedApiResult): media is ExtendedApiResult {
    return "recommendations" in media;
}

export function typeIsExtendedMovie(media: ExtendedApiResult): media is ExtendedMovieApiResult {
    return 'budget' in media;
}

export function typeIsMovie(media: ApiResult): media is MovieApiResult {
    return "title" in media;
}

export const SingleApiMediaToListItem : (media: ApiResult | ExtendedApiResult) => MongoMedia = (media) => {
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