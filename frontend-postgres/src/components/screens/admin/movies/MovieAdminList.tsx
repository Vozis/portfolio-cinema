import { FC } from 'react';

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation';
import AdminTable from '@/ui/admin-table/AdminTable';
import AdminHeader from '@/ui/admin-table/admin-header/AdminHeader';
import Heading from '@/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

import { useMovies } from '@/screens/admin/movies/useMovies';

const MovieAdminList: FC = () => {
  const {
    handleSearch,
    isLoading,
    searchTerm,
    data,
    deleteAsync,
    createAsync,
  } = useMovies();

  const headerItems = ['Title', 'Genres', 'Rating'];

  return (
    <Meta title={'Movies'}>
      <AdminNavigation />
      <Heading title={'Movies'} />
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

export default MovieAdminList;
