import { Prisma } from '@prisma/client';
import { returnFileObject } from '../file/return-file.object';
import { returnGenreObject } from '../genre/return-genre.object';
import { returnRatingObject } from '../rating/return-rating.object';
import { returnActorObject } from '../actor/return-actor.object';

export const returnMoviesObject: Prisma.MovieSelect = {
  id: true,
  title: true,
  slug: true,
  description: true,
  countOpened: true,
  averageRating: true,
  year: true,
  duration: true,
  country: true,
  posters: {
    select: returnFileObject,
  },
  bigPosters: {
    select: returnFileObject,
  },
  videos: {
    select: returnFileObject,
  },
  genres: {
    select: returnGenreObject,
  },
  actors: {
    select: returnActorObject,
  },
};
