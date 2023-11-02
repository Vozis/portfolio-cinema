
import * as process from 'process';

export const API_URL = `${process.env.APP_URL}/api`;
export const API_SERVER_URL = `${process.env.APP_SERVER_URL}/api`;

export const getGenreApi = (string: string) => `/genres/${string}`;
export const getUsersApi = (string: string) => `/users/${string}`;
export const getAuthApi = (string: string) => `/auth/${string}`;
export const getMoviesApi = (string: string) => `/movies/${string}`;
export const getActorsApi = (string: string) => `/actors/${string}`;
export const getRatingsApi = (string: string) => `/ratings/${string}`;