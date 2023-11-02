import React, { FC, useState } from 'react';

import Logo from '@/layout/header/Logo';
import Menu from '@/layout/menu-container/Menu';
import MenuContainer from '@/layout/menu-container/MenuContainer';
import GenreMenu from '@/layout/menu-container/genres/GenreMenu';
import { firstMenu } from '@/layout/menu-container/menu.data';

import { MaterialIcon } from '@/ui/MaterialIcon';
import BurgerMenu from '@/ui/burger-menu/BurgerMenu';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import styles from './Navigation.module.scss';

const Navigation: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.navigation}>
      <BurgerMenu onClick={handleClick} />
      {isDesktop && <MenuContainer />}
      {isOpen && <MenuContainer />}
    </div>
  );
};

export default Navigation;
