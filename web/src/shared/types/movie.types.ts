import { IGenre } from '@/shared/types/genre.types';
import { TypeMaterialIconName } from '@/shared/types/icon.types';
import { IUser } from '@/shared/types/user.types';

export interface IParameters {
  year: number;
  duration: number;
  country: string;
}

export interface IFile {
  id: number;
  name: string;
  originalName: string;
  url: string;
  folder?: string;
}

export interface IRating {
  value: number;
  userId: string;
}

export interface IActor {
  id: number;
  name: string;
  photos: IFile[];
  movies: IMovie[];
  slug: string;
  countMovies: number;
}

export interface IMovie {
  id: number;
  title: string;
  slug: string;
  // parameters: IParameters;
  year: number;
  duration: number;
  country: string;
  genres: IGenre[];
  actors: IActor[];
  posters: IFile[];
  bigPosters: IFile[];
  videos: IFile[];
  rating: IRating[];
  averageRating: number;
  countOpened: number;
}
