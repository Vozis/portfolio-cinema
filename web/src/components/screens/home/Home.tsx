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
      title={'Watch Movies'}
      description={
        'Смотри любые фильмы и сериалы в любое время прямиком с твоего браузера'
      }
    >
      <Heading
        title={'Наслаждайся просмотром!'}
        className={'text-gray-400 mb-8 text-xl'}
      />
      {slides.length ? (
        <Slider slides={slides} />
      ) : (
        <div className={'text-white text-opacity-60'}>На данный момент смотреть нечего...</div>
      )}

      <div className={'my-10'}>
        <SubHeading title={'В тренде'} />
        {trendingMovies.length ? (
          <Gallery items={trendingMovies} />
        ) : (
          <div className={'text-white text-opacity-60'}>
            На данные момент здесь ничего нет...
          </div>
        )}
      </div>

      <div className={'my-10'}>
        <SubHeading title={'Лучшие актеры'} />
        {actors.length ? (
          <Gallery items={actors} />
        ) : (
          <div className={'text-white text-opacity-60'}>
            На данные момент здесь ничего нет...
          </div>
        )}
      </div>
    </Meta>
  );
};

export default Home;
