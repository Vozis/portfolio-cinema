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
  movies: { select: returnMoviesObject },
};

export const returnFullActorObject: Prisma.ActorSelect = {
  ...returnActorObject,
};

export type ActorSelect = Prisma.ActorGetPayload<{
  select: typeof returnActorObject;
}>;

export type ActorFullSelect = Prisma.ActorGetPayload<{
  select: typeof returnFullActorObject;
}>;
