import { Prisma } from '@prisma/client';

export const returnRatingObject: Prisma.RatingSelect = {
  id: true,
  value: true,
  movieId: true,
  userId: true,
};
