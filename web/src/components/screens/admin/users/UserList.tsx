import { FC } from 'react';

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation';
import AdminTable from '@/ui/admin-table/AdminTable';
import AdminHeader from '@/ui/admin-table/admin-header/AdminHeader';
import Heading from '@/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

import { useUsers } from '@/screens/admin/users/useUsers';

const UserList: FC = () => {
  const { handleSearch, isLoading, searchTerm, data, deleteAsync } = useUsers();

  const headerItems = ['Email', 'Date register'];

  return (
    <Meta title={'Users'}>
      <AdminNavigation />
      <Heading title={'Users'} />
      <AdminHeader handleSearch={handleSearch} searchTerm={searchTerm} />

      <AdminTable
        tableItems={data || []}
        headerItems={headerItems}
        isLoading={isLoading}
        removeHandler={deleteAsync}
      />
    </Meta>
  );
};

export default UserList;
