import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren, useRef } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from '@/layout/Layout';

import ReduxToastrProvider from '@/providers/ReduxToastrProvider';
import AuthProvider from '@/providers/auth-provider/AuthProvider';
import HeadProvider from '@/providers/head-provider/HeadProvider';

import { TypeComponentAuthFields } from '@/shared/types/auth.types';

import { store } from '@/store/store';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const MainProvider: FC<PropsWithChildren<TypeComponentAuthFields>> = ({
  children,
  Component,
}) => {
  return (
    <HeadProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ReduxToastrProvider />
          <AuthProvider Component={Component}>
            <Layout>{children}</Layout>
            <ToastContainer autoClose={2000} />
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </HeadProvider>
  );
};

export default MainProvider;
