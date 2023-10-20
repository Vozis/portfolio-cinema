import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { ITableItem } from '@/ui/admin-table/admin-table.interface';

import { getAdminUrl } from '@/config/api/url.config';

import { useDebounce } from '@/hooks/useDebounce';

import { toastError } from '@/utils/toast-error';

import { GenreService } from '@/services/genre.service';

export const useGenres = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { push } = useRouter();

  const queryData = useQuery(
    ['search-genres-list-get', debouncedSearch],
    () => GenreService.getAll(debouncedSearch),
    {
      select: ({ data: genres }) =>
        genres.map(
          (genre): ITableItem => ({
            id: genre.id,
            editUrl: getAdminUrl(`genres/edit/${genre.id}`),
            items: [genre.name, genre.slug],
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
    ['delete-genre', debouncedSearch],
    (genreId: number) => GenreService.delete(genreId),
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

  const { mutateAsync: createAsync } = useMutation(
    ['create-genre', debouncedSearch],
    () => GenreService.create(),
    {
      onError: error => {
        toastError(error);
      },
      onSuccess: ({ data: _id }) => {
        toast.success('Create was successful');
        push(getAdminUrl(`genres/edit/${_id}`));
      },
    },
  );

  return useMemo(
    () => ({
      handleSearch,
      ...queryData,
      searchTerm,
      deleteAsync,
      createAsync,
    }),
    [queryData, searchTerm, deleteAsync, createAsync],
  );
};
