import dynamic from 'next/dynamic';
import { FC } from 'react';

import MenuItem from '@/layout/menu-container/menu-item/MenuItem';
import { IMenu } from '@/layout/menu-container/menu-item/menu-item.interface';

import styles from './Menu.module.scss';

const DynamicAuthItems = dynamic(
  () => import('@/layout/header/auth/AuthItems'),
  {
    ssr: false,
  },
);
const Menu: FC<{ menu: IMenu }> = ({ menu }) => {
  const { items, title } = menu;

  return (
    <div className={styles.menu}>
      <h2 className={'text-gray-400 uppercase text-sm font-semibold mb-2'}>
        {title}
      </h2>
      <ul className={styles.list}>
        {items && items.length
          ? items.map(item => <MenuItem key={item.link} item={item} />)
          : null}
        {title === 'Основные' ? <DynamicAuthItems /> : null}
      </ul>
    </div>
  );
};

export default Menu;
