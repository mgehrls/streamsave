import type { UserResource } from '@clerk/types';
import type { ObjectId } from 'mongodb';


export type User =  {
  isLoaded: boolean;
  isSignedIn: boolean | undefined;
  user: UserResource | null | undefined;
}

export type MovieApiResult = {
    adult: boolean,
    backdrop_path: string,
    genre_ids: [],
    id: number,
    media_type: string,
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
  
export type ShowApiResult =   {
    adult: boolean,
    backdrop_path: string,
    first_air_date: string,
    genre_ids: number[],
    id: number,
    media_type: string,
    name: string,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    vote_average: number,
    vote_count: number,
  }

export type ApiResult = MovieApiResult | ShowApiResult;
  
export type ApiResponse = {
    pages: number,
    results: ApiResult[],
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
  createdAt: Date;
  userId: string;
  media: MongoMedia
}

export type MongoMedia = {
  id: number;
  title: string;
  type: 'movie' | 'tv';
  poster: string;
  backdrop: string | null;
  description: string;
  watchLater?: boolean;
  tags: {id:number, name:string}[];
}

export type DeleteMediaProps = {
  setConfirmDeletion: React.Dispatch<React.SetStateAction<boolean>>;
  setMediaToDeleteId: React.Dispatch<React.SetStateAction<ObjectId | null>>;
  setMediaTitle: React.Dispatch<React.SetStateAction<string | null>>;
};

export type ExtendedMovieApiResult = {
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
    results: ApiResult[],
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

export type ExtendedShowApiResult = {
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
  recommendations:ApiResponse,
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

export type ExtendedApiResult = ExtendedMovieApiResult | ExtendedShowApiResult;