import dynamic from 'next/dynamic';
import { FC } from 'react';

import PopularMovies from '@/layout/sidebar/movies-container/PopularMovies';

const DynamicFavorites = dynamic(
  () =>
    import('@/layout/sidebar/movies-container/favorite-movies/FavoriteMovies'),
  {
    ssr: false,
  },
);
const MoviesContainer: FC = () => {
  return (
    <div>
      <PopularMovies />
      <DynamicFavorites />
    </div>
  );
};

export default MoviesContainer;
