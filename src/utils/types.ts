export type MovieAPIResult = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: [],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
  }
  
export type ShowAPIResult =   {
    adult: boolean,
    backdrop_path: string,
    id: number,
    name: string,
    original_language: string,
    original_name: string,
    overview: string,
    poster_path: string,
    media_type: string,
    genre_ids: number[],
    popularity: number,
    first_air_date: string,
    vote_average: number,
    vote_count: number,
    origin_country: string[],
    title: string,
  }

export type APIResult = MovieAPIResult & ShowAPIResult;
  
export type APIResponse = {
    pages: number,
    results: ShowAPIResult[] | MovieAPIResult[],
    total_pages: number,
    total_results: number,
  }

  export type Media ={
    id: number;
    title: string;
    type: string;
    poster: string;
    backdrop: string;
    description: string;
    createdAt?: Date;
    genres?: number[];
}

export type ListItemPlusMedia=({
  media: Media;
} & ListItem) | undefined

export type ListItem = {
  id: string;
  createdAt: Date;
  lastSeen: string;
  userId: string;
  mediaId: number;
  watchLater: boolean;
  tags?: number[];
}