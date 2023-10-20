import { useQuery } from '@tanstack/react-query';

import { IMenuItem } from '@/layout/menu-container/menu-item/menu-item.interface';

import { getGenreUrl } from '@/config/api/url.config';

import { GenreService } from '@/services/genre.service';

export const usePopularGenres = () => {
  const queryData = useQuery(
    ['popular-genre-menu'],
    () => GenreService.getAll(),
    {
      select: ({ data }) =>
        data
          .filter(genre => genre.icon)
          .map(
            genre =>
              ({
                icon: genre.icon,
                link: getGenreUrl(genre.slug),
                title: genre.name,
              } as IMenuItem),
          )
          .splice(0, 4),
      onError: error => {
        console.log(error);
      },
    },
  );

  return queryData;
};
