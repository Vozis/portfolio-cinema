import cn from 'clsx';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

import { IMenuItem } from '@/layout/menu-container/menu-item/menu-item.interface';

import { MaterialIcon } from '@/ui/MaterialIcon';

const MenuItem: FC<{ item: IMenuItem }> = ({ item }) => {
  const { asPath } = useRouter();

  return (
    <li
      className={cn('border-r-4 border-r-transparent transition-colors', {
        'border-r-primary': asPath === item.link,
      })}
    >
      <Link
        href={item.link}
        className={
          'flex items-center text-gray-400 cursor-pointer transition-colors hover:text-white'
        }
      >
        <MaterialIcon
          className={cn('text-2lg md:text-md', {
            'fill-primary': asPath === item.link,
          })}
          name={item.icon}
        />
        <span
          className={cn('ml-3 text-lg md:text-md', {
            'text-white': asPath === item.link,
          })}
        >
          {item.title}
        </span>
      </Link>
    </li>
  );
};

export default MenuItem;
