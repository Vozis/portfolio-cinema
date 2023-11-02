import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { ITableItem } from '@/ui/admin-table/admin-table.interface';

import { getAdminUrl } from '@/config/api/url.config';

import { useDebounce } from '@/hooks/useDebounce';

import { convertMongoDbDate } from '@/utils/date/convertMongoDbDate';
import { toastError } from '@/utils/toast-error';

import { ActorService } from '@/services/actor.service';
import { MovieService } from '@/services/movie.service';

export const useActors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const { push } = useRouter();

  const { mutateAsync: createAsync } = useMutation(
    ['create-actor', debouncedSearch],
    () => ActorService.create(),
    {
      onError: error => {
        toastError(error);
      },
      onSuccess: ({ data: id }) => {
        toast.success('Create was successful');
        push(getAdminUrl(`actors/edit/${id}`));
      },
    },
  );

  const queryData = useQuery(
    ['search-actors-list-get', debouncedSearch],
    () => ActorService.getAll(debouncedSearch),
    {
      select: ({ data: actors }) =>
        actors.map(
          (actor): ITableItem => ({
            id: actor.id,
            editUrl: getAdminUrl(`actors/edit/${actor.id}`),
            items: [actor.name, String(actor.countMovies)],
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
    ['delete-actor', debouncedSearch],
    (actorId: number) => ActorService.delete(actorId),
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
      searchTerm,
      deleteAsync,
      createAsync,
    }),
    [queryData, searchTerm, deleteAsync, createAsync],
  );
};
