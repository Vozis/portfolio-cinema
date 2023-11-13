import { useQuery } from '@tanstack/react-query';
import cn from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import SubHeading from '@/ui/heading/SubHeading';
import SkeletonLoader from '@/ui/skeleton/SkeletonLoader';

import { IMovie } from '@/shared/types/movie.types';

import { getMovieUrl } from '@/config/api/url.config';

import styles from '../../Admin.module.scss';

import { MovieService } from '@/services/movie.service';

const StatisticsPopularMovies: FC = () => {
  const { isLoading, data: movie } = useQuery(
    ['most-popular-movie-in-admin'],
    () => MovieService.getMostPopularMovies(),
    {
      select: (data): IMovie => data[0],
    },
  );
  return (
    <div className={cn(styles.block, styles.popular)}>
      <SubHeading title={'Популярные фильмы'} />
      {isLoading ? (
        <SkeletonLoader className={'h-48'} />
      ) : (
        movie && (
          <>
            <h3>Просмотрен {movie.countOpened} раз</h3>
            <Link href={getMovieUrl(movie.slug)}>
              <Image
                src={movie.bigPosters[0].url}
                alt={movie.title}
                width={285}
                height={176}
                className={styles.image}
                unoptimized
              />
            </Link>
          </>
        )
      )}
    </div>
  );
};

export default StatisticsPopularMovies;
