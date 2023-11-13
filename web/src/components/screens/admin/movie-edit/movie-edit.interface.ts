import { IActor, IMovie } from '@/shared/types/movie.types';

export interface IMovieEditInput extends Omit<IMovie, '_id' | 'genres' | 'actors'> {
  genres: number[];
  actors: number[];
}

export interface IMovieEditForm
  extends Omit<IMovie, '_id' | 'posters' | 'bigPosters' | 'videos' | 'genres' | 'actors'> {
  posters: number[];
  bigPosters: number[];
  videos: number[];
  genres: number[];
  actors: number[];
}
