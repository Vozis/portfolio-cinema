import { FC } from 'react';
import { Rating } from 'react-simple-star-rating';

import { useAuth } from '@/hooks/useAuth';

import styles from './RateMovie.module.scss';
import { useRateMovie } from '@/screens/single-movie/rate-movie/userateMovie';

interface IRateMovie {
  movieId: number;
  slug: string;
}

const RateMovie: FC<IRateMovie> = ({ movieId, slug }) => {
  const { isLoading, user } = useAuth();

  const { handleClick, rating, isSended } = useRateMovie(movieId);

  return (
    <div className={styles.wrapper}>
      <h3>Вам понравился фильм?</h3>
      <p>Оценка улучшает Ваши рекомендации</p>
      {user ? (
        <>
          {isSended ? (
            <div className={styles.thanks}>Спасибо за оценку!</div>
          ) : (
            <Rating
              initialValue={rating}
              onClick={handleClick}
              SVGstyle={{ display: 'inline' }}
            />
          )}
        </>
      ) : (
        <div>Войди прежде, чем ставить рейтинг</div>
      )}
    </div>
  );
};

export default RateMovie;
