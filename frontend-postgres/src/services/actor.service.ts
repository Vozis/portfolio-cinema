import { IGenre } from '@/shared/types/genre.types';
import { IActor, IMovie } from '@/shared/types/movie.types';
import { IUser } from '@/shared/types/user.types';

import {
  getActorsApi,
  getGenreApi,
  getMoviesApi,
  getUsersApi,
} from '@/config/api/api.config';
import { axiosClassic, instance } from '@/config/api/axios.interceptor';

import {
  IActorEditForm,
  IActorEditInput,
} from '@/screens/admin/actors-edit/actor-edit.interface';

export const ActorService = {
  async getAll(searchTerm?: string) {
    return axiosClassic.get<IActor[]>(getActorsApi(''), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },

  async getById(id: number) {
    return instance.get<IActorEditInput>(getActorsApi(`${id}`));
  },

  async getBySlug(slug: string) {
    const response = await axiosClassic.get<IActor>(
      getActorsApi(`by-slug/${slug}`),
    );

    return response;
  },

  async create() {
    return instance.post(getActorsApi(''));
  },

  async update(id: number, data: IActorEditForm) {
    return instance.put(getActorsApi(`${id}`), data, {});
  },

  async delete(id: number) {
    return instance.delete<string>(getActorsApi(`${id}`));
  },
};
