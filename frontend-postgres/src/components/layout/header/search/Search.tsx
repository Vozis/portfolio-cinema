import { FC } from 'react';

import SearchList from '@/layout/header/search/search-list/SearchList';
import { useSearch } from '@/layout/header/search/useSearch';

import SearchField from '@/ui/input/SearchField';

import styles from './Search.module.scss';

const Search: FC = () => {
  const { handleSearch, data, isSuccess, searchTerm } = useSearch();

  return (
    <div className={styles.wrapper}>
      <SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
      {isSuccess && <SearchList movies={data || []} />}
    </div>
  );
};

export default Search;
