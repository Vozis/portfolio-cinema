import { IGenre } from '@/shared/types/genre.types';

export const getGenreListEach = (index: number, length: number, name: string) =>
  index + 1 === length ? name : name + ', ';

interface IArrayItem {
  id: number;
  name: string;
}

export const getGenreList = (array: IGenre[]) => {
  const result = array.map(item => item.name).join(', ');
  return result;
};
