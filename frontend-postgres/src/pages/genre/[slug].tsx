import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import CatalogMovies from '@/ui/catalog-movies/CatalogMovies';

import { IGenre } from '@/shared/types/genre.types';
import { IMovie } from '@/shared/types/movie.types';

import ErrorPage from '@/pages/404';
import { GenreService } from '@/services/genre.service';
import { MovieService } from '@/services/movie.service';

interface IGenrePage {
  movies: IMovie[];
  genre: IGenre | undefined;
}

const GenrePage: NextPage<IGenrePage> = ({ movies, genre }) => {
  return genre ? (
    <CatalogMovies
      title={genre.name}
      description={genre.description}
      movies={movies || []}
    />
  ) : (
    <ErrorPage />
  );
};

export default GenrePage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data: genre } = await GenreService.getBySlug(String(params?.slug));

    const { data: movies } = await MovieService.getByGenres([genre.id]);

    return {
      props: { movies, genre },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: genres } = await GenreService.getAll();

    const paths = genres.map(genre => ({
      params: {
        slug: genre.slug,
      },
    }));
    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
};
