import dynamic from 'next/dynamic';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation';
import Button from '@/ui/form-elements/Button';
import Heading from '@/ui/heading/Heading';
import SkeletonLoader from '@/ui/skeleton/SkeletonLoader';

import Meta from '@/utils/meta/Meta';

import { useUserEdit } from '@/screens/admin/user-edit/useUserEdit';
import { IUserEditInput } from '@/screens/admin/user-edit/user-edit.interface';
import AuthFields from '@/screens/auth/AuthFields';

const UserEdit: FC = () => {
  const {
    register,
    control,
    reset,
    handleSubmit,
    formState,
    setValue,
    getValues,
  } = useForm<IUserEditInput>({
    mode: 'onChange',
  });

  const { isLoading, onSubmit, mutateAsync } = useUserEdit(setValue);

  return (
    <Meta title={'Edit User'}>
      <AdminNavigation />
      <Heading title={'Edit User'} />
      <form onSubmit={handleSubmit(onSubmit)} className={'admin-form'}>
        {isLoading ? (
          <SkeletonLoader count={3} />
        ) : (
          <>
            <AuthFields register={register} formState={formState} />
            <Controller
              render={({ field }) => (
                <button
                  onClick={e => {
                    e.preventDefault();
                    field.onChange(!field.value);
                  }}
                  className={'text-link block mb-7'}
                >
                  {field.value ? 'Make it regular' : 'Make it admin'}
                </button>
              )}
              name={'isAdmin'}
              control={control}
            />
            <Button>Update</Button>
          </>
        )}
      </form>
    </Meta>
  );
};

export default UserEdit;
