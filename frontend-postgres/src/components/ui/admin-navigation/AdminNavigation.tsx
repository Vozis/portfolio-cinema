import { FC } from 'react';

import AdminNavItem from '@/ui/admin-navigation/AdminNavItem';
import { navItems } from '@/ui/admin-navigation/admin-navigation.data';

const AdminNavigation: FC = () => {
  return (
    <nav className={'air-block mx-auto mb-10 max-md:mb-5 p-2'}>
      <ul className={'flex justify-evenly items-center'}>
        {navItems.map(item => (
          <li className={'inline-block'} key={item.link}>
            <AdminNavItem item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminNavigation;
