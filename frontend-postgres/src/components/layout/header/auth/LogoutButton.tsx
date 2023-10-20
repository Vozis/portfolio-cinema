import cn from 'clsx';
import dynamic from 'next/dynamic';
import { FC, MouseEvent } from 'react';

import { MaterialIcon } from '@/ui/MaterialIcon';

import { useActions } from '@/hooks/useActions';

const LogoutButton: FC = () => {
  const { logout } = useActions();

  const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    logout();
  };

  return (
    <li className={cn(' border-r-4 border-r-transparent transition-colors')}>
      <a
        onClick={handleLogout}
        className={
          'flex items-center text-gray-600 cursor-pointer transition-colors hover:text-white'
        }
      >
        <MaterialIcon name={'MdLogout'} className={'text-2lg'} />
        <span className={'ml-3 text-lg'}>Logout</span>
      </a>
    </li>
  );
};

export default LogoutButton;
