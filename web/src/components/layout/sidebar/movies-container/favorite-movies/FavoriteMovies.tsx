import { FC } from 'react';

import MovieList from '@/layout/sidebar/movies-container/MovieList';
import NotAuthFavorites from '@/layout/sidebar/movies-container/favorite-movies/NotAuthFavorites';

import SkeletonLoader from '@/ui/skeleton/SkeletonLoader';

import { useAuth } from '@/hooks/useAuth';

import { useFavorite } from '@/screens/favorites/useFavorite';

const FavoriteMovies: FC = () => {
  const { favoriteMovies, isLoading } = useFavorite();
  const { user } = useAuth();

  if (!user) return <NotAuthFavorites />;

  return isLoading ? (
    <div className={'mt-11'}>
      <SkeletonLoader count={3} className={'h-28 mb-4'} />
    </div>
  ) : (
    <MovieList
      movies={favoriteMovies?.slice(0, 3) || []}
      title={'Favorites movies'}
      link={'/favorites'}
    />
  );
};

export default FavoriteMovies;
