import { Prisma } from '@prisma/client';
import { returnFileObject } from '../file/return-file.object';
import { returnMoviesObject } from '../movie/return-movies.object';

export const returnActorObject: Prisma.ActorSelect = {
  id: true,
  name: true,
  slug: true,
  countMovies: true,
  photos: {
    select: returnFileObject,
  },
};

export const returnFullActorObject: Prisma.ActorSelect = {
  ...returnActorObject,
  movies: { select: returnMoviesObject },
};
