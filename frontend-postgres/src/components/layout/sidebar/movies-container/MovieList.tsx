import cn from 'clsx';
import Link from 'next/link';
import { FC } from 'react';

import MovieItem from '@/layout/sidebar/movies-container/MovieItem';
import { IMovieList } from '@/layout/sidebar/movies-container/module-list.interface';

import styles from './MovieList.module.scss';

const MovieList: FC<IMovieList> = ({ movies, title, link }) => {
  return (
    <div className={'animate-fade mb-5'}>
      <div className={'font-bold text-xl text-white mb-5 capitalize'}>
        {title}
      </div>
      <div
        className={cn(styles.list, {
          'justify-evenly': movies.length > 1,
        })}
      >
        {movies.length ? (
          movies.map(movie => <MovieItem key={movie.id} movie={movie} />)
        ) : (
          <div className={'text-white text-opacity-50 font-medium mb-4'}>
            No movies yet
          </div>
        )}
      </div>
      <Link href={link} className={'p-2.5 btn-primary block text-center'}>
        {link === '/trending' ? 'All trending movies' : 'All favorite movies'}
      </Link>
    </div>
  );
};

export default MovieList;
