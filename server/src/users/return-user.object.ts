import { Prisma } from '@prisma/client';
import { returnMoviesObject } from '../movie/return-movies.object';

export const returnUserObject: Prisma.UserSelect = {
  id: true,
  email: true,
  password: true,
  roles: true,
  isAdmin: true,
  favorites: {
    select: returnMoviesObject,
  },
};
