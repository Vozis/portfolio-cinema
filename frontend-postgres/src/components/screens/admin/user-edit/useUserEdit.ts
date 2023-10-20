import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getAdminUrl } from '@/config/api/url.config';

import { getKeys } from '@/utils/object/getKeys';
import { toastError } from '@/utils/toast-error';

import { IUserEditInput } from '@/screens/admin/user-edit/user-edit.interface';
import { UserService } from '@/services/user.service';

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
  const { query, push } = useRouter();

  const userId = Number(query.id);

  const { isLoading } = useQuery(
    ['get-user-by-id', userId],
    () => UserService.getById(userId),
    {
      onSuccess: ({ data }) => {
        setValue('email', data.email);
        setValue('isAdmin', data.isAdmin);
      },
      onError: error => {
        toastError(error, 'Get user');
      },
      enabled: !!query.id,
    },
  );

  const { mutateAsync } = useMutation(
    ['update-user', userId],
    (data: IUserEditInput) => UserService.update(userId, data),
    {
      onError: error => {
        toastError(error, 'Update user');
      },
      onSuccess: () => {
        toast.success('Update user successfully');
        push(getAdminUrl('/users'));
      },
    },
  );

  const onSubmit: SubmitHandler<IUserEditInput> = async data => {
    await mutateAsync(data);
  };

  return { mutateAsync, onSubmit, isLoading };
};
