import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/ui/form-elements/Button';
import Heading from '@/ui/heading/Heading';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';

import Meta from '@/utils/meta/Meta';

import AuthFields from '@/screens/auth/AuthFields';
import { IAuthInput } from '@/screens/auth/auth.interface';
import { useAuthRedirect } from '@/screens/auth/useAuthRedirect';

const Auth: FC = () => {
  useAuthRedirect();

  const { isLoading } = useAuth();

  const [type, setType] = useState<'login' | 'register'>('login');

  const {
    register: registerInput,
    handleSubmit,
    formState,
    reset,
  } = useForm<IAuthInput>({
    mode: 'onChange',
  });

  const { login, register } = useActions();

  const onSubmit: SubmitHandler<IAuthInput> = data => {
    if (type === 'login') login(data);
    else if (type === 'register') register(data);


  };

  return (
    <Meta title={'Auth'}>
      <section className={'mt-32 max-lg:mt-20 max-md:15 mb-10'}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={
            'mx-auto w-1/2 air-block bg-opacity-80 p-7 text-center max-md:w-3/4'
          }
        >
          <Heading title={'Авторизация'} className={'mb-6'} />

          <AuthFields
            register={registerInput}
            formState={formState}
            isPasswordRequired={true}
          />
          <div
            className={'mt-12 flex justify-center max-md:flex-col max-md:gap-4'}
          >
            <Button
              type={'submit'}
              onClick={() => setType('login')}
              disabled={isLoading}
              className={'rounded-r-none max-md:block max-md:rounded-md'}
            >
              Войти
            </Button>
            <Button
              type={'submit'}
              onClick={() => setType('register')}
              disabled={isLoading}
              className={
                'rounded-l-none opacity-80 hover:opacity-100 transition-opacity bg-[#76140D] max-md:block max-md:rounded-md'
              }
            >
              Зарегистрироваться
            </Button>
          </div>
        </form>
      </section>
    </Meta>
  );
};

export default Auth;
