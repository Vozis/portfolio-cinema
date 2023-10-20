import { Prisma } from '@prisma/client';

export const returnFileObject: Prisma.FileSelect = {
  id: true,
  url: true,
  originalName: true,
  folder: true,
  name: true,
};

export const returnFullFileObject: Prisma.FileSelect = {
  ...returnFileObject,
  posterId: true,
  bigPosterId: true,
  photoId: true,
  videoId: true,
};
