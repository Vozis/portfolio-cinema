import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { IMovie } from '@/shared/types/movie.types';

import { getMovieUrl } from '@/config/api/url.config';

import styles from './SearchList.module.scss';

const SearchList: FC<{ movies: IMovie[] }> = ({ movies }) => {
  return (
    <div className={styles.list}>
      {movies.length ? (
        movies.map(movie => (
          <Link key={movie.id} href={getMovieUrl(movie.slug)}>
            <Image
              src={movie.posters[0].url}
              alt={movie.title}
              width={50}
              height={50}
              className={'object-cover object-top'}
              draggable={false}
            />
            <span>{movie.title}</span>
          </Link>
        ))
      ) : (
        <div className={'text-white text-center my-4'}>Movies not found</div>
      )}
    </div>
  );
};

export default SearchList;
