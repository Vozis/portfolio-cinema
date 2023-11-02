import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import { MaterialIcon } from '@/ui/MaterialIcon';

import { IMovie } from '@/shared/types/movie.types';

import { getGenreUrl, getMovieUrl } from '@/config/api/url.config';

import { getGenreListEach } from '@/utils/movie/getGenreListEach';

import styles from './MovieList.module.scss';

const MovieItem: FC<{ movie: IMovie }> = ({ movie }) => {
  return (
    <div className={styles.item}>
      <Link href={getMovieUrl(movie.slug)}>
        <Image
          src={movie.posters[0].url}
          alt={movie.title}
          draggable={false}
          width={65}
          height={120}
          priority
          className={
            'rounded-image transition-colors border border-transparent hover:border-primary'
          }
        />
      </Link>
      <div className={'flex flex-col justify-between'}>
        <div>
          <p className={'text-white md:text-md text-lg font-medium truncate'}>
            {movie.title}
          </p>
          <div className={'text-gray-600 text-sm'}>
            {movie.genres.map((genre, index) => (
              <Link
                key={genre.id}
                href={getGenreUrl(genre.slug)}
                className={''}
              >
                {getGenreListEach(index, movie.genres.length, genre.name)}
              </Link>
            ))}
          </div>
        </div>
        <div className={'flex items-center mb-2 max-md:hidden max-sm:flex'}>
          <MaterialIcon
            name={'MdStarRate'}
            className={'fill-yellow-700 mr-2 text-lg'}
          />
          <span className={'text-white font-medium pt-0.5'}>
            {movie.averageRating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieItem;
