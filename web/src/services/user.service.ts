import { IMovie } from '@/shared/types/movie.types';
import { IUser } from '@/shared/types/user.types';

import { getUsersApi } from '@/config/api/api.config';
import { instance } from '@/config/api/axios.interceptor';

import { IProfileInput } from '@/screens/profile/profile.interface';

export const UserService = {
  async getAll(searchTerm?: string) {
    return instance.get<IUser[]>(getUsersApi(''), {
      params: searchTerm
        ? {
            searchTerm,
          }
        : {},
    });
  },

  async getProfile() {
    return instance.get<IUser>(getUsersApi(`profile`));
  },

  async updateProfile(data: IProfileInput) {
    return instance.put<string>(getUsersApi(`profile`), data);
  },

  async getById(id: number) {
    return instance.get<IUser>(getUsersApi(`${id}`));
  },

  async update(id: number, data: IProfileInput) {
    return instance.put<IUser>(getUsersApi(`${id}`), data);
  },

  async deleteUser(id: number) {
    return instance.delete<string>(getUsersApi(`${id}`));
  },

  async getFavorites() {
    return await instance.get<IMovie[]>(getUsersApi(`profile/favorites`));
  },

  async toggleFavorite(movieId: number) {
    return instance.put(getUsersApi(`profile/favorites`), { movieId });
  },
};
