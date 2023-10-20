import Cookies from 'js-cookie';

import { getAuthApi } from '@/config/api/api.config';
import { getContentType } from '@/config/api/api.helper';
import { axiosClassic } from '@/config/api/axios.interceptor';

import { IAuthResponse } from '@/store/user/user.interface';

import {
  removeTokensFromStorage,
  saveToStorage,
} from '@/services/auth/auth.helper';

export const AuthService = {
  async register(email: string, password: string) {
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthApi('register'),
      { email, password },
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },

  async login(email: string, password: string) {
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthApi('login'),
      { email, password },
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
  async logout() {
    removeTokensFromStorage();
    localStorage.removeItem('user');
  },

  async getNewToken() {
    const refreshToken = Cookies.get('refreshToken');
    let jsonToken;
    if (refreshToken) {
      jsonToken = JSON.parse(refreshToken);
    }


    const response = await axiosClassic.post<IAuthResponse>(
      getAuthApi('login/access-token'),
      { refreshToken: jsonToken },
      { headers: getContentType() },
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
};
