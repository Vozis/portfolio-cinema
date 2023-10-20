import { FC } from 'react';

import styles from '../../Admin.module.scss';

import StatisticsCountUsers from '@/screens/admin/home/statistics/StatisticsCountUsers';
import StatisticsPopularMovies from '@/screens/admin/home/statistics/StatisticsPopularMovies';

const Statistics: FC = () => {
  return (
    <div className={styles.statistics}>
      <StatisticsCountUsers />
      <StatisticsPopularMovies />
    </div>
  );
};

export default Statistics;
