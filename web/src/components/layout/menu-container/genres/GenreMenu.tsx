import { FC } from 'react';

import Menu from '@/layout/menu-container/Menu';
import { usePopularGenres } from '@/layout/menu-container/genres/usePopularGenres';

import SkeletonLoader from '@/ui/skeleton/SkeletonLoader';

const GenreMenu: FC = () => {
  const { data, isLoading } = usePopularGenres();

  return isLoading ? (
    <div className={'mx-11 mb-6'}>
      <SkeletonLoader count={5} className={'h-7 mt-6'} />
    </div>
  ) : (
    <Menu menu={{ title: 'Жанры в тренде', items: data || [] }} />
  );
};

export default GenreMenu;
