import axios from 'axios';
import Cookies from 'js-cookie';

import { API_SERVER_URL, API_URL } from '@/config/api/api.config';
import { errorCatch, getContentType } from '@/config/api/api.helper';
import { IS_PRODUCTION } from '@/config/constants';

import { removeTokensFromStorage } from '@/services/auth/auth.helper';
import { AuthService } from '@/services/auth/auth.service';
import getConfig from "next/config";


const axiosOptions = {
  baseURL: IS_PRODUCTION ? API_SERVER_URL : API_URL,
  headers: getContentType(),
};

export const axiosClassic = axios.create({
  baseURL: IS_PRODUCTION ? API_SERVER_URL : API_URL,
  headers: getContentType(),
});

export const instance = axios.create(axiosOptions);

instance.interceptors.request.use(config => {
  const accessToken = Cookies.get('accessToken');

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${JSON.parse(accessToken)}`;
  }

  return config;
});

instance.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config;
    if (
      (error.response.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await AuthService.getNewToken();

        return instance.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === 'jwt expired') {
          removeTokensFromStorage();
        }
      }
    }
    throw error;
  },
);
