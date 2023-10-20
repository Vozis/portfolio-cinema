import dynamic from 'next/dynamic';
import { FC } from 'react';

import LogoutButton from '@/layout/header/auth/LogoutButton';
import MenuItem from '@/layout/menu-container/menu-item/MenuItem';

import { getAdminHomeUrl } from '@/config/api/url.config';

import { useAuth } from '@/hooks/useAuth';

const AuthItems: FC = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <>
          <MenuItem
            item={{
              icon: 'MdSettings',
              link: '/profile',
              title: 'Profile',
            }}
          />
          <LogoutButton />
        </>
      ) : (
        <MenuItem
          item={{
            icon: 'MdLogin',
            link: '/auth',
            title: 'Auth',
          }}
        />
      )}
      {user?.isAdmin && (
        <MenuItem
          item={{
            icon: 'MdOutlineLock',
            link: getAdminHomeUrl(),
            title: 'Admin Panel',
          }}
        />
      )}
    </>
  );
};

export default AuthItems;
