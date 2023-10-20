import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

import CatalogMovies from '@/ui/catalog-movies/CatalogMovies';

import { IActor } from '@/shared/types/movie.types';
import { IMovie } from '@/shared/types/movie.types';

import ErrorPage from '@/pages/404';
import { ActorService } from '@/services/actor.service';
import { MovieService } from '@/services/movie.service';

interface IActorPage {
  movies: IMovie[];
  actor: IActor | undefined;
}

const ActorPage: NextPage<any> = ({ movies, actor }) => {
  return actor ? (
    <CatalogMovies title={actor.name} movies={movies || []} />
  ) : (
    <ErrorPage />
  );
};

export default ActorPage;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { data: actor } = await ActorService.getBySlug(String(params?.slug));

    const { data: movies } = await MovieService.getByActor(actor.id);

    return {
      props: { movies, actor },
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
    const { data: actors } = await ActorService.getAll();

    const paths = actors.map(actor => ({
      params: {
        slug: actor.slug,
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
