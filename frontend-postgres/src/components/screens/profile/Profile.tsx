import { FC } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/ui/form-elements/Button';
import Heading from '@/ui/heading/Heading';
import SkeletonLoader from '@/ui/skeleton/SkeletonLoader';

import Meta from '@/utils/meta/Meta';

import AuthFields from '@/screens/auth/AuthFields';
import { IProfileInput } from '@/screens/profile/profile.interface';
import { useProfile } from '@/screens/profile/useProfile';

const Profile: FC = () => {
  const { register, handleSubmit, formState, setValue } =
    useForm<IProfileInput>({
      mode: 'onChange',
    });

  const { isLoading, onSubmit, mutateAsync } = useProfile(setValue);

  return (
    <Meta title={'Profile'}>
      <Heading title={'Profile'} className={'mb-6'} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'mx-auto w-1/2 air-block bg-opacity-80 p-7 text-center'}
      >
        {isLoading ? (
          <SkeletonLoader count={2} />
        ) : (
          <AuthFields register={register} formState={formState} />
        )}

        <Button>Update</Button>
      </form>
    </Meta>
  );
};

export default Profile;
