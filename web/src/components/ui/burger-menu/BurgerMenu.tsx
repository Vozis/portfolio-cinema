import React, { FC } from 'react';

import { MaterialIcon } from '@/ui/MaterialIcon';

import styles from './Burger.module.scss';

interface IBurgerMenu {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const BurgerMenu: FC<IBurgerMenu> = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <MaterialIcon name={'MdMenu'} className={styles.iconMenu} />
    </div>
  );
};

export default BurgerMenu;
