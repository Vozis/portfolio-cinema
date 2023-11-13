import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';

import MovieList from '@/layout/sidebar/movies-container/MovieList';

import SkeletonLoader from '@/ui/skeleton/SkeletonLoader';

import { MovieService } from '@/services/movie.service';

const PopularMovies: FC = () => {
  const { isLoading, data: popularMovies } = useQuery(
    ['popular-movies-sidebar'],
    () => MovieService.getMostPopularMovies(),
    {
      select: data => data.slice(0, 3),
    },
  );

  return isLoading ? (
    <div className={''}>
      <SkeletonLoader count={3} className={'h-28 mb-4'} />
    </div>
  ) : (
    <div>
      <MovieList
        movies={popularMovies || []}
        title={'Популярные фильмы'}
        link={'/trending'}
      />
    </div>
  );
};

export default PopularMovies;
