import { Prisma } from '@prisma/client';
import { returnMoviesObject } from '../movie/return-movies.object';

export const returnGenreObject: Prisma.GenreSelect = {
  id: true,
  name: true,
  icon: true,
  slug: true,
};

export const returnFullGenreObject: Prisma.GenreSelect = {
  ...returnGenreObject,
  description: true,
  movies: {
    select: returnMoviesObject,
  },
};
