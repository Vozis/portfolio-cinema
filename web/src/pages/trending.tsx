import { QueryClient, dehydrate } from '@tanstack/query-core';
import { GetStaticProps, NextPage } from 'next';

import CatalogMovies from '@/ui/catalog-movies/CatalogMovies';

import { IMovie } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie.service';

const TrendingPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
  return (
    <CatalogMovies
      title={'Популярные фильмы'}
      description={'Самые популярные фильмы среди зрителей.'}
      movies={movies || []}
    />
  );
};

export default TrendingPage;

export const getStaticProps = async () => {
  try {
    const movies = await MovieService.getMostPopularMovies();

    return {
      props: { movies },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

// export const getStaticProps: GetStaticProps = async () => {
//   const queryClient = new QueryClient();
//
//   await queryClient.prefetchQuery(['Popular movies'], () =>
//     MovieService.getMostPopularMovies(),
//   );
//
//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// };
