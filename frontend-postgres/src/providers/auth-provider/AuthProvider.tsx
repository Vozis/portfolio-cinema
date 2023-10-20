import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect } from 'react';

import { TypeComponentAuthFields } from '@/shared/types/auth.types';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';

const DynamicCheckRole = dynamic(() => import('./CheckRole'), {
  ssr: false,
});

const AuthProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
  children,
  Component: { isOnlyUser, isOnlyAdmin },
}) => {
  const { user } = useAuth();

  const { logout, checkAuth } = useActions();

  const { pathname } = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      checkAuth();
    }
  }, []);

  useEffect(() => {
    const refreshToken = Cookies.get('refreshToken');
    if (!refreshToken && user) logout();
  }, [pathname]);

  return !isOnlyUser && !isOnlyAdmin ? (
    <>{children}</>
  ) : (
    <DynamicCheckRole Component={{ isOnlyUser, isOnlyAdmin }}>
      {children}
    </DynamicCheckRole>
  );
};

export default AuthProvider;
