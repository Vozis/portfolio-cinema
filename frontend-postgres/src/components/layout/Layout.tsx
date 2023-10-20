import { FC, PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

import Header from '@/layout/header/Header';
import Navigation from '@/layout/navigation/Navigation';
import Sidebar from '@/layout/sidebar/Sidebar';

import styles from './Layout.module.scss';

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={styles.layout}>
        <Navigation />
        <div className={styles.center}>{children}</div>
        <Sidebar />
      </div>
    </div>
  );
};

export default Layout;
