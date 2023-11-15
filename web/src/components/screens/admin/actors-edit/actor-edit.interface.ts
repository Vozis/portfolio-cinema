import { IActor, IFile, IMovie } from "@/shared/types/movie.types";

export interface IActorEditInput extends Omit<IActor, '_id'> {
  // photos: number[] | IFile[];
}

export interface IActorEditForm extends Omit<IActor, '_id' | 'photos' | 'movies'> {
  photos: number[];
  movies: number[];
}
