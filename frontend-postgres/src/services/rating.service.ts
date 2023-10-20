import { getRatingsApi } from '@/config/api/api.config';
import { axiosClassic, instance } from '@/config/api/axios.interceptor';

import { IProfileInput } from '@/screens/profile/profile.interface';

export const RatingService = {
  async setRating(movieId: number, value: number) {
    return instance.post<string>(getRatingsApi(`set-rating`), {
      movieId,
      value,
    });
  },

  async getByUserMovie(movie: number) {
    return instance.get<number>(getRatingsApi(`./${movie}`));
  },
};
