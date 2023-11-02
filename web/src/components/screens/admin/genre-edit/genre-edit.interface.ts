import { IGenre } from '@/shared/types/genre.types';

export interface IGenreEditInput extends Omit<IGenre, '_id'> {}
