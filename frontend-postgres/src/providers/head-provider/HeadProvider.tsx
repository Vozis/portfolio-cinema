import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { FC, PropsWithChildren } from 'react';

import { FavIcon } from '@/providers/head-provider/FavIcon';

import { accentColor } from '@/config/constants';

const HeadProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <>
      <NextNProgress
        color={accentColor}
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={true}
      />
      <Head>
        <meta
          name={'viewport'}
          content={'width=device-width, initial-scale=1, maximum-scale=5'}
        />

        <FavIcon />

        <meta name={'theme-color'} content={'#17191D'} />
        <meta name={'msapplication-navbutton-color'} content={'#17191D'} />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content={'#17191D'}
        />

        <link rel={'manifest'} href={'/manifest.json'} />
      </Head>
      {children}
    </>
  );
};

export default HeadProvider;
