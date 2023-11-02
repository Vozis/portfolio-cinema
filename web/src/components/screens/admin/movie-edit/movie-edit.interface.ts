import { IActor, IMovie } from '@/shared/types/movie.types';

export interface IMovieEditInput extends Omit<IMovie, '_id'> {}

export interface IMovieEditForm
  extends Omit<IMovie, '_id' | 'posters' | 'bigPosters' | 'videos'> {
  posters: number[];
  bigPosters: number[];
  videos: number[];
}
