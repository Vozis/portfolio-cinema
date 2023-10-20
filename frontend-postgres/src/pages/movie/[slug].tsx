import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { log } from 'next/dist/server/typescript/utils';

import CatalogMovies from '@/ui/catalog-movies/CatalogMovies';
import { IGalleryItem } from '@/ui/gallery/gallery.interface';

import { IMovie } from '@/shared/types/movie.types';

import { getMovieUrl } from '@/config/api/url.config';

import ErrorPage from '@/pages/404';
import SingleMovie from '@/screens/single-movie/SingleMovie';
import { MovieService } from '@/services/movie.service';

export interface IMoviePage {
  movie: IMovie;
  similarMovies: IGalleryItem[];
}

const MoviePage: NextPage<IMoviePage> = ({ similarMovies, movie }) => {
  return movie ? (
    <SingleMovie movie={movie} similarMovies={similarMovies || []} />
  ) : (
    <ErrorPage />
  );
};

export default MoviePage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data: movie } = await MovieService.getBySlug(String(params?.slug));

    const { data: dataSimilarMovies } = await MovieService.getByGenres(
      movie.genres.map(g => g.id),
    );

    const similarMovies: IGalleryItem[] = dataSimilarMovies
      .filter(m => m.id !== movie.id)
      .map(item => ({
        name: item.title,
        posterPath: item.posters[0].url,
        link: getMovieUrl(item.slug),
      }));

    return {
      props: { similarMovies, movie },
      revalidate: 10,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { data: movies } = await MovieService.getAll();

    const paths = movies.map(movie => ({
      params: {
        slug: movie.slug,
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
