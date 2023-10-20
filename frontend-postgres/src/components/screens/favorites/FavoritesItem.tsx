import cn from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { IMovie } from '@/shared/types/movie.types';

import { getMovieUrl } from '@/config/api/url.config';

import { useAuth } from '@/hooks/useAuth';

import styles from './Favorites.module.scss';
import FavoriteButton from '@/screens/single-movie/FavoriteButton';

const FavoritesItem: FC<{ movie: IMovie }> = ({ movie }) => {
  const { user } = useAuth();

  return (
    <div className={styles.itemWrapper}>
      {user && <FavoriteButton movieId={movie.id} />}
      <Link
        href={getMovieUrl(movie.slug)}
        className={cn(styles.item, {
          [styles.withText]: movie.title,
        })}
      >
        <Image
          src={movie.bigPosters[0].url}
          alt={movie.title}
          draggable={true}
          fill={true}
          priority
          style={{
            objectFit: 'cover',
          }}
        />

        <div className={styles.title}>{movie.title}</div>
      </Link>
    </div>
  );
};

export default FavoritesItem;
