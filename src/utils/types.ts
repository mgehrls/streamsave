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
  
export type APIResponse = {
    pages: number,
    results: ShowAPIResult[] | MovieAPIResult[],
    total_pages: number,
    total_results: number,
  }

  export type SbMedia ={
    backdrop_path:string,
    created_at?:string,
    description:string,
    id:number,
    poster_path:string,
    title:string,
    type: string
}

export type ListItemPlusMedia={
    id:string,
    created_at?:string,
    lastSeen: Date | null,
    media: SbMedia,
    media_id:number,
    user_id:string,
}

export type ListItem = {
    id:string,
    created_at?:string,
    lastSeen: Date | null,
    media_id:number,
    user_id:string,
}