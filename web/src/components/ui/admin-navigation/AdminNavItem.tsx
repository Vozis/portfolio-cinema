import cn from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { INavItem } from '@/ui/admin-navigation/admin-navigation.interface';

const AdminNavItem: FC<{ item: INavItem }> = ({ item: { title, link } }) => {
  const { asPath } = useRouter();

  return (
    <Link
      href={link}
      className={cn(
        'block px-5 py-4 max-md:px-2 max-md:py-1 text-lg max-md:text-md max-sm:text-sm transition-colors relative text-white text-opacity-60 hover:text-opacity-100 before:absolute before:w-full before:h-0.5 before:bg-transparent before:content=[""] before:left-0 before:bottom-0 before:rounded-md',
        {
          ['text-opacity-100 before:bg-primary text-primary']: asPath === link,
        },
      )}
    >
      {title}
    </Link>
  );
};

export default AdminNavItem;
