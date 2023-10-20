import { IActor, IMovie } from '@/shared/types/movie.types';

export interface IActorEditInput extends Omit<IActor, '_id'> {}

export interface IActorEditForm extends Omit<IActor, '_id' | 'photos'> {
  photos: number[];
}
