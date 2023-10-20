import { FC } from 'react';

import Search from '@/layout/header/search/Search';
import MoviesContainer from '@/layout/sidebar/movies-container/MoviesContainer';

import styles from './Sidebar.module.scss';

const Sidebar: FC = () => {
  return (
    <div className={styles.sidebar}>
      <MoviesContainer />
    </div>
  );
};

export default Sidebar;
