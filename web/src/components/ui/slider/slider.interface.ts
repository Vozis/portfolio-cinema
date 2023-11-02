import { IMovie } from '@/shared/types/movie.types';

export interface ISlide extends Pick<IMovie, 'id' | 'title'> {
  bigPoster: string;
  subTitle: string;
  link: string;
}
