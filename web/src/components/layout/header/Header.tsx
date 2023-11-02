import { FC } from 'react';

import HeaderMenu from '@/layout/header/HeaderMenu';
import Logo from '@/layout/header/Logo';
import Search from '@/layout/header/search/Search';
import Menu from '@/layout/menu-container/Menu';
import { userMenu } from '@/layout/menu-container/menu.data';

import styles from './Header.module.scss';

const Header: FC = () => {
  return (
    <div className={styles.header}>
      <Logo />
      <Search />
    </div>
  );
};

export default Header;
