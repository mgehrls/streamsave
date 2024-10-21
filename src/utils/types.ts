import type { UserResource } from '@clerk/types';
import type { ObjectId } from 'mongodb';

export type User =  {
  isLoaded: boolean;
  isSignedIn: boolean | undefined;
  user: UserResource | null | undefined;
}

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
    results: APIResult[],
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

export type MongoListItem = {
  _id?: string | ObjectId;
  createdAt: Date;
  userId: string;
  media: MongoMedia
}
export type MongoMedia = {
  id: number;
  title: string;
  type: string;
  poster: string;
  backdrop: string | null;
  description: string;
  watchLater?: boolean;
  tags: {id:number, name:string}[];
}

export type ListItemFull=({
  media: {
      id: number;
      createdAt: Date;
      title: string;
      type: string;
      poster: string;
      backdrop: string;
      description: string;
  };
} & {
  id: string;
  createdAt: Date;
  lastSeen: string;
  userId: string;
  mediaId: number;
  watchLater: boolean;
} & {
  tags: {id:number, name:string}[]
})[] | undefined

export type FullListItem = {
  media: {
      id: number;
      createdAt: Date;
      title: string;
      type: string;
      poster: string;
      backdrop: string;
      description: string;
  };
} & {
  id: string;
  createdAt: Date;
  lastSeen: string;
  userId: string;
  mediaId: number;
  watchLater: boolean;
} & {
  tags: {id:number, name:string}[]
}


export interface ListItemPlusMedia{
  media: {
  id: number;
  createdAt: Date;
  title: string;
  type: string;
  poster: string;
  backdrop: string;
  description: string;
};
tags: {
  id: number;
  name: string;
}[];
id: string;
createdAt: Date;
lastSeen: string;
userId: string;
mediaId: number;
watchLater: boolean;
}

export type ListItem = {
  id: string;
  createdAt: Date;
  lastSeen: string;
  userId: string;
  mediaId: number;
  watchLater: boolean;
  tags?: number[];
}

export type SingleMovieAPIResponse = {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: null,
  budget: number,
  external_ids:{
    facebook_id?: string,
    freebase_id?: string,
    freebase_mid?: string,
    imdb_id?: string,
    instagram_id?: string,
    tvdb_id?: number,
    tvrage_id?: number,
    twitter_id?: string | null,
    wikidata_id?: string,
  },
  genres:{ id: number, name: string }[],
  homepage: string,
  id: number,
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies:
    {
      id: number,
      logo_path: string,
      name: string,
      origin_country: string
    }[],
  production_countries: 
    { iso_3166_1: string, name: string }[],
  recommendations:{
    page:number,
    results: APIResult[],
    total_pages: number,
    total_results: number
  },
  release_date: string,
  revenue: number,
  runtime: number,
  spoken_languages: 
    { english_name: string, iso_639_1: string, name: string }[],
  status: string,
  tagline: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number
}

export type SingleShowAPIResponse = {
  adult: boolean,
  backdrop_path: string,
  created_by: [],
  episode_run_time: number[],
  external_ids:{
    facebook_id?: string,
    freebase_id?: string,
    freebase_mid?: string,
    imdb_id?: string,
    instagram_id?: string,
    tvdb_id?: number,
    tvrage_id?: number,
    twitter_id?: string | null,
    wikidata_id?: string,
  },
  first_air_date: string,
  genres: 
    { id: number, name: string}[],
  homepage: string,
  id: number,
  in_production: boolean,
  languages: string[],
  last_air_date: string,
  last_episode_to_air: {
    id: number,
    name: string,
    overview: string,
    vote_average: number,
    vote_count: number,
    air_date: string,
    episode_number: number,
    episode_type: string,
    production_code: string,
    runtime: number,
    season_number: number,
    show_id: number,
    still_path: string,
  },
  name: string,
  next_episode_to_air: null,
  networks:
    {
      id: number,
      logo_path: string,
      name: string,
      origin_country: string
    }[],
  number_of_episodes: number,
  number_of_seasons: number ,
  origin_country: string[],
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string,
  production_companies:
    {
      id: number,
      logo_path: string,
      name: string,
      origin_country: string
    }[], 
  production_countries:  { iso_3166_1:string, name: string } [],
  recommendations:{
    page:number,
    results: {
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
    }[],
    total_pages: number,
    total_results: number
  },
  seasons:
    {
      air_date: string,
      episode_count: number,
      id: number,
      name: string,
      overview: string,
      poster_path: string,
      season_number: number,
      vote_average: number
    }[],
  spoken_languages:  { english_name: string, iso_639_1: string, name: string } [],
  status: string,
  tagline: string,
  type: string,
  vote_average: number,
  vote_count: number
}

export type SingleMediaAPIUnity = SingleMovieAPIResponse & SingleShowAPIResponse