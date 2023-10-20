import { FC, useRef } from 'react';

import Gallery from '@/ui/gallery/Gallery';
import Heading from '@/ui/heading/Heading';
import SubHeading from '@/ui/heading/SubHeading';
import Slider from '@/ui/slider/Slider';

import Meta from '@/utils/meta/Meta';

import { IHome } from '@/screens/home/home.interface';

const Home: FC<IHome> = ({ slides, actors, trendingMovies }) => {
  return (
    <Meta
      title={'Watch movies'}
      description={
        'Watch MovieApp movies amd TV shows online right from your browser'
      }
    >
      <Heading
        title={'Watch movies'}
        className={'text-gray-400 mb-8 text-xl'}
      />
      {slides.length ? (
        <Slider slides={slides} />
      ) : (
        <div className={'text-white text-opacity-60'}>No movies yet...</div>
      )}

      <div className={'my-10'}>
        <SubHeading title={'Trending now'} />
        {trendingMovies.length ? (
          <Gallery items={trendingMovies} />
        ) : (
          <div className={'text-white text-opacity-60'}>
            No trending movies yet...
          </div>
        )}
      </div>

      <div className={'my-10'}>
        <SubHeading title={'Best actors'} />
        {actors.length ? (
          <Gallery items={actors} />
        ) : (
          <div className={'text-white text-opacity-60'}>
            No bet actors yet...
          </div>
        )}
      </div>
    </Meta>
  );
};

export default Home;
