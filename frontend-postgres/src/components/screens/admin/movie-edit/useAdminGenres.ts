import { useQuery } from '@tanstack/react-query';

import { IOption } from '@/ui/select/select.interface';

import { getAdminUrl } from '@/config/api/url.config';

import { toastError } from '@/utils/toast-error';

import { GenreService } from '@/services/genre.service';

export const useAdminGenres = () => {
  const queryData = useQuery(
    ['get-genres-to-movie-edit'],
    () => GenreService.getAll(),
    {
      select: ({ data: genres }) =>
        genres.map(
          (genre): IOption => ({
            label: genre.name,
            value: genre.id,
          }),
        ),
      onError: error => {
        toastError(error);
      },
    },
  );

  return queryData;
};
