import dynamic from 'next/dynamic';
import { FC } from 'react';

import { MaterialIcon } from '@/ui/MaterialIcon';

import { IMovie } from '@/shared/types/movie.types';

import { getGenreApi } from '@/config/api/api.config';
import { getActorUrl, getGenreUrl } from '@/config/api/url.config';

import { useAuth } from '@/hooks/useAuth';

import styles from './Content.module.scss';
import FavoriteButton from '@/screens/single-movie/FavoriteButton';
import ContentList from '@/screens/single-movie/content/content-list/ContentList';

const DynamicFavoriteButton = dynamic(
  () => import('@/screens/single-movie/FavoriteButton'),
  { ssr: false },
);
const Content: FC<{ movie: IMovie }> = ({ movie }) => {
  const { user } = useAuth();

  return (
    <div className={styles.content}>
      <h1>{movie.title}</h1>
      <div className={styles.details}>
        <span>{movie.year} • </span>
        <span>{movie.country} • </span>
        <span>{movie.duration} min. </span>
      </div>
      <ContentList
        name={'Жанры'}
        links={movie.genres.slice(0, 3).map(g => ({
          id: g.id,
          link: getGenreUrl(g.slug),
          title: g.name,
        }))}
      />
      <ContentList
        name={'Актеры'}
        links={movie.actors.slice(0, 3).map(a => ({
          id: a.id,
          link: getActorUrl(a.slug),
          title: a.name,
        }))}
      />

      <div className={styles.rating}>
        <MaterialIcon name={'MdStarRate'} />
        {movie.averageRating.toFixed(1)}
      </div>

      {user && <DynamicFavoriteButton movieId={movie.id} />}
    </div>
  );
};

export default Content;
