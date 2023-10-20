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
      <h3>How do you like the movie?</h3>
      <p>Ratings improve recommendations</p>
      {user ? (
        <>
          {isSended ? (
            <div className={styles.thanks}>Thanks for rating</div>
          ) : (
            <Rating
              initialValue={rating}
              onClick={handleClick}
              SVGstyle={{ display: 'inline' }}
            />
          )}
        </>
      ) : (
        <div>Please log in</div>
      )}
    </div>
  );
};

export default RateMovie;
