import { genresFromAPI } from "./genres"
import { APIResult, MongoMedia } from "./types"

export const ApiMediaToListItem : (media: APIResult) => MongoMedia = (media) => {
    return {
        id: media.id,
        title: media.title,
        type: media.name ? "tv" : "movie",
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