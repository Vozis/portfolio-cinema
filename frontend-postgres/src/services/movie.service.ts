import { IMovie } from '@/shared/types/movie.types';

import { getMoviesApi } from '@/config/api/api.config';
import { axiosClassic, instance } from '@/config/api/axios.interceptor';

import {
  IMovieEditForm,
  IMovieEditInput,
} from '@/screens/admin/movie-edit/movie-edit.interface';

export const MovieService = {
  async getAll(searchTerm?: string) {
    const movies = await axiosClassic.get<IMovie[]>(getMoviesApi(''), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });

    // console.log('movies from movie.service: ', movies.data);

    return movies;
  },
  async getMostPopularMovies() {
    const { data: movies } = await axiosClassic.get<IMovie[]>(
      getMoviesApi('most-popular'),
    );

    // console.log('MOvies from service: ', movies);

    return movies;
  },

  async getByGenres(genresIds: number[]) {
    return await axiosClassic.post<IMovie[]>(getMoviesApi('by-genres'), {
      genresIds,
    });
  },

  async getByActor(actorId: number) {
    const response = await axiosClassic.get<IMovie[]>(
      getMoviesApi(`by-actor/${actorId}`),
    );

    return response;
  },

  async getBySlug(slug: string) {
    const response = await axiosClassic.get<IMovie>(
      getMoviesApi(`by-slug/${slug}`),
    );

    return response;
  },

  async getById(id: number) {
    return instance.get<IMovieEditInput>(getMoviesApi(`${id}`));
  },

  async create() {
    return instance.post(getMoviesApi(''));
  },

  async update(id: number, data: IMovieEditForm) {
    return instance.put<string>(getMoviesApi(`${id}`), data, {});
  },

  async delete(id: number) {
    return instance.delete<string>(getMoviesApi(`${id}`));
  },

  async updateCountOpened(slug: string) {
    return axiosClassic.put<string>(getMoviesApi(`update-count-opened`), {
      slug,
    });
  },
};
