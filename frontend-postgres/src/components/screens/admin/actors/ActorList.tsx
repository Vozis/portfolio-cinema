import { FC } from 'react';

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation';
import AdminTable from '@/ui/admin-table/AdminTable';
import AdminHeader from '@/ui/admin-table/admin-header/AdminHeader';
import Heading from '@/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

import { useActors } from '@/screens/admin/actors/useActors';

const ActorList: FC = () => {
  const {
    handleSearch,
    isLoading,
    searchTerm,
    data,
    deleteAsync,
    createAsync,
  } = useActors();

  const headerItems = ['Name', 'Count of movies'];

  return (
    <Meta title={'Actors'}>
      <AdminNavigation />
      <Heading title={'Actors'} />
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

export default ActorList;
