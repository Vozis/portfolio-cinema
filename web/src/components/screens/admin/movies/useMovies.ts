import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { ITableItem } from '@/ui/admin-table/admin-table.interface';

import { getAdminUrl, getGenreUrl } from '@/config/api/url.config';

import { useDebounce } from '@/hooks/useDebounce';

import { getGenreList, getGenreListEach } from '@/utils/movie/getGenreListEach';
import { toastError } from '@/utils/toast-error';

import { MovieService } from '@/services/movie.service';

export const useMovies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { push } = useRouter();

  const { mutateAsync: createAsync } = useMutation(
    ['create-movie', debouncedSearch],
    () => MovieService.create(),
    {
      onError: error => {
        toastError(error);
      },
      onSuccess: ({ data: id }) => {
        toast.success('Create was successful');
        push(getAdminUrl(`movies/edit/${id}`));
      },
    },
  );

  const queryData = useQuery(
    ['search-movies-list-get', debouncedSearch],
    () => MovieService.getAll(debouncedSearch),
    {
      select: ({ data: movies }) =>
        movies.map(
          (movie): ITableItem => ({
            id: movie.id,
            editUrl: getAdminUrl(`movies/edit/${movie.id}`),
            items: [
              movie.title,
              getGenreList(movie.genres),
              // String(movie.rating.toFixed(1)),
            ],
          }),
        ),
      onError: error => {
        toastError(error);
      },
    },
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const { mutateAsync: deleteAsync } = useMutation(
    ['delete-movie', debouncedSearch],
    (movieId: number) => MovieService.delete(movieId),
    {
      onError: error => {
        toastError(error);
      },
      onSuccess: () => {
        toast.success('delete was successful');
        queryData.refetch();
      },
    },
  );

  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      deleteAsync,
      createAsync,
      searchTerm,
    }),
    [queryData, searchTerm, deleteAsync, createAsync],
  );
};
