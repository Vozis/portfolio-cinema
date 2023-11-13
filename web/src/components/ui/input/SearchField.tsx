import { ChangeEvent, FC } from 'react';

import { MaterialIcon } from '@/ui/MaterialIcon';

import styles from './SearchField.module.scss';

interface ISearchField {
  searchTerm: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: FC<ISearchField> = ({ searchTerm, handleSearch }) => {
  return (
    <div
      className={`${styles.search} rounded-3xl border border-gray-700 px-3 py-2 max-sm:px-2 max-sm:py-1 flex items-center transition-colors w-full`}
    >
      <MaterialIcon
        name={'MdSearch'}
        className={
          'fill-gray-600 mr-2 text-3xl max-md:text-xl transition-colors'
        }
      />
      <input
        placeholder={'Поиск...'}
        value={searchTerm}
        onChange={handleSearch}
        className={
          'text-white placeholder:text-gray-600 block bg-transparent w-full outline-none'
        }
      />
    </div>
  );
};

export default SearchField;
