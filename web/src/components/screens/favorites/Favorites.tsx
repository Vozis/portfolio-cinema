import { FC } from 'react';

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation';
import Heading from '@/ui/heading/Heading';
import SkeletonLoader from '@/ui/skeleton/SkeletonLoader';

import { useAuth } from '@/hooks/useAuth';

import Meta from '@/utils/meta/Meta';

import styles from './Favorites.module.scss';
import Statistics from '@/screens/admin/home/statistics/Statistics';
import FavoritesItem from '@/screens/favorites/FavoritesItem';
import { useFavorite } from '@/screens/favorites/useFavorite';

const Favorites: FC = () => {
  const { favoriteMovies, isLoading } = useFavorite();

  const { user } = useAuth();

  if (!user) return null;

  return (
    <Meta title={'Favorites'}>
      <Heading title={'Favorites'} />
      <section className={styles.favorites}>
        {isLoading ? (
          <SkeletonLoader
            count={3}
            className={styles.skeletonLoader}
            containerClassName={styles.containerLoader}
          />
        ) : (
          favoriteMovies?.map(movie => (
            <FavoritesItem movie={movie} key={movie.id} />
          ))
        )}
      </section>
    </Meta>
  );
};

export default Favorites;
