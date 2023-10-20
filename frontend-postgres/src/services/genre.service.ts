import { IGenre } from '@/shared/types/genre.types';

import { getGenreApi } from '@/config/api/api.config';
import { axiosClassic, instance } from '@/config/api/axios.interceptor';

import { IGenreEditInput } from '@/screens/admin/genre-edit/genre-edit.interface';
import { ICollection } from '@/screens/collection/collection.interface';

export const GenreService = {
  async getAll(searchTerm?: string) {
    return await axiosClassic.get<IGenre[]>(getGenreApi(''), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },

  async getById(id: number) {
    return instance.get<IGenreEditInput>(getGenreApi(`${id}`));
  },

  async getBySlug(slug: string) {
    const response = await axiosClassic.get<IGenre>(
      getGenreApi(`by-slug/${slug}`),
    );

    return response;
  },

  async getCollection() {
    return axiosClassic.get<ICollection[]>(getGenreApi(`collections`));
  },

  async create() {
    return instance.post(getGenreApi(''));
  },

  // async getPopularGenres(limit = 4) {
  //   return axiosClassic.get<IGenre[]>(getGenreApi('/popular'));
  // },

  async delete(id: number) {
    return instance.delete<string>(getGenreApi(`${id}`));
  },

  async update(id: number, data: IGenreEditInput) {
    return instance.put<string>(getGenreApi(`${id}`), data);
  },
};
