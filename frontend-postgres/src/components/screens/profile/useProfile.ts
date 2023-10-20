import { useMutation, useQuery } from '@tanstack/react-query';
import { SubmitHandler, UseFormSetValue } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getAdminUrl } from '@/config/api/url.config';

import { getKeys } from '@/utils/object/getKeys';
import { toastError } from '@/utils/toast-error';

import { IProfileInput } from '@/screens/profile/profile.interface';
import { UserService } from '@/services/user.service';

export const useProfile = (setValue: UseFormSetValue<IProfileInput>) => {
  const { isLoading } = useQuery(
    ['get-profile-by-id'],
    () => UserService.getProfile(),
    {
      onSuccess: ({ data }) => {
        setValue('email', data.email);
      },
      onError: error => {
        toastError(error, 'Get profile');
      },
    },
  );

  const { mutateAsync } = useMutation(
    ['update-profile'],
    (data: IProfileInput) => UserService.updateProfile(data),
    {
      onError: error => {
        toastError(error, 'Update profile');
      },
      onSuccess: () => {
        toast.success('Update user successfully');
      },
    },
  );

  const onSubmit: SubmitHandler<IProfileInput> = async data => {
    await mutateAsync(data);
  };

  return { mutateAsync, onSubmit, isLoading };
};
