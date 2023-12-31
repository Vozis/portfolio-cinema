import { NextPage } from 'next';

import CatalogMovies from '@/ui/catalog-movies/CatalogMovies';

import { IMovie } from '@/shared/types/movie.types';

import { MovieService } from '@/services/movie.service';

const FreshPage: NextPage<{ movies: IMovie[] }> = ({ movies }) => {
  // console.log(movies);
  return (
    <CatalogMovies
      title={'Новинки кино'}
      description={'Новые фильмы и сериалы в лучшем качестве!'}
      movies={movies || []}
    />
  );
};

export default FreshPage;

export const getStaticProps = async () => {
  try {
    const { data: movies } = await MovieService.getAll();


    return {
      props: { movies },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
