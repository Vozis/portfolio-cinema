import dynamic from 'next/dynamic';
import { FC } from 'react';

import Banner from '@/ui/banner/Banner';
import Gallery from '@/ui/gallery/Gallery';
import SubHeading from '@/ui/heading/SubHeading';

import { useMediaQuery } from '@/hooks/useMediaQuery';

import Meta from '@/utils/meta/Meta';

import { IMoviePage } from '@/pages/movie/[slug]';
import Content from '@/screens/single-movie/content/Content';
import { useUpdateCountOpened } from '@/screens/single-movie/useUpdateCountOpened';

const DynamicRating = dynamic(
  () => import('@/screens/single-movie/rate-movie/RateMovie'),
  {
    ssr: false,
  },
);

const DynamicPlayer = dynamic(() => import('react-player'), { ssr: false });

const SingleMovie: FC<IMoviePage> = ({ movie, similarMovies }) => {
  useUpdateCountOpened(movie.slug);

  const isMobile = useMediaQuery('(min-width:425px)');

  return (
    <Meta title={movie.title} description={`Watch ${movie?.title}`}>
      <Banner
        Detail={() => <Content movie={movie} />}
        image={movie.bigPosters[0].url}
      />

      <DynamicPlayer
        url={movie.videos[0].url}
        controls={true}
        width={isMobile ? 500 : 300}
        style={{
          margin: 'auto',
          borderRadius: '50px',
          marginTop: `${isMobile ? '25px' : '15px'}`,
        }}
      />

      <div className={'mt-12'}>
        <SubHeading title={'Похожие фильмы'} />
        <Gallery items={similarMovies} />
      </div>

      <DynamicRating movieId={movie.id} slug={movie.slug} />
    </Meta>
  );
};

export default SingleMovie;
