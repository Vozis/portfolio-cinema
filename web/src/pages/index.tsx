import { GetStaticProps, NextPage } from 'next';

import { IGalleryItem } from '@/ui/gallery/gallery.interface';
import { ISlide } from '@/ui/slider/slider.interface';

import { errorCatch } from '@/config/api/api.helper';
import { getActorUrl, getMovieUrl } from '@/config/api/url.config';

import { getGenreList } from '@/utils/movie/getGenreListEach';

import Home from '@/screens/home/Home';
import { IHome } from '@/screens/home/home.interface';
import { ActorService } from '@/services/actor.service';
import { MovieService } from '@/services/movie.service';

const HomePage: NextPage<any> = ({ slides, actors, trendingMovies }) => {

  // console.log('slides from element: ', slides);
  // console.log('trendingMovies from element: ', trendingMovies);


  return (
    <Home slides={slides} actors={actors} trendingMovies={trendingMovies} />
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const { data: dataMovies } = await MovieService.getAll();
    const { data: dataActors } = await ActorService.getAll();
    const dataTrendingMovies = await MovieService.getMostPopularMovies();
    //
    // console.log('ssss',dataMovies.slice(0, 3).map(m => ({
    //   id: m.id,
    //   link: getMovieUrl(m.slug),
    //   // bigPoster: m.bigPosters[0].url,
    //   subTitle: getGenreList(m.genres),
    //   title: m.title,
    // })));

    const slides: ISlide[] = dataMovies.slice(0, 3).map(m => ({
      id: m.id,
      link: getMovieUrl(m.slug),
      bigPoster: m.bigPosters[0].url,
      subTitle: getGenreList(m.genres),
      title: m.title,
    }));

    // console.log('slides: ', slides);


    const actors: IGalleryItem[] = dataActors.slice(0, 7).map(item => ({
      name: item.name,
      posterPath: item.photos[0].url,
      link: getActorUrl(item.slug),
      content: {
        title: item.name,
        subTitle: `+${item.countMovies} movies`,
      },
    }));

    const trendingMovies: IGalleryItem[] = dataTrendingMovies
      .slice(0, 7)
      .map(item => ({
        name: item.title,
        posterPath: item.posters[0].url,
        link: getMovieUrl(item.slug),
      }));

    return {
      props: {
        slides,
        actors,
        trendingMovies,
      },
    };
  } catch (error) {
    console.log('error form server: ',error);
    return {
      props: {
        slides: [],
        actors: [],
        trendingMovies: [],
      } as IHome,
    };
  }
};

export default HomePage;
