import { FC } from 'react';

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation';
import AdminTable from '@/ui/admin-table/AdminTable';
import AdminHeader from '@/ui/admin-table/admin-header/AdminHeader';
import Heading from '@/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

import { useGenres } from '@/screens/admin/genres/useGenres';

const GenreList: FC = () => {
  const {
    handleSearch,
    isLoading,
    searchTerm,
    data,
    deleteAsync,
    createAsync,
  } = useGenres();

  const headerItems = ['Наименование', 'Slug'];

  return (
    <Meta title={'Genres'}>
      <AdminNavigation />
      <Heading title={'Жанры'} />
      <AdminHeader
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        onClick={createAsync}
      />

      <AdminTable
        tableItems={data || []}
        headerItems={headerItems}
        isLoading={isLoading}
        removeHandler={deleteAsync}
      />
    </Meta>
  );
};

export default GenreList;
