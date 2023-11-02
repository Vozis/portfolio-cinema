import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { ITableItem } from '@/ui/admin-table/admin-table.interface';

import { getAdminUrl } from '@/config/api/url.config';

import { useDebounce } from '@/hooks/useDebounce';

import { convertMongoDbDate } from '@/utils/date/convertMongoDbDate';
import { toastError } from '@/utils/toast-error';

import { UserService } from '@/services/user.service';

export const useUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const queryData = useQuery(
    ['search-users-list-get', debouncedSearch],
    () => UserService.getAll(debouncedSearch),
    {
      select: ({ data: users }) =>
        users.map(
          (user): ITableItem => ({
            id: user.id,
            editUrl: getAdminUrl(`users/edit/${user.id}`),
            items: [user.email, convertMongoDbDate(user.createdAt)],
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
    ['delete-user', debouncedSearch],
    (userId: number) => UserService.deleteUser(userId),
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
    }),
    [queryData, searchTerm, deleteAsync],
  );
};
