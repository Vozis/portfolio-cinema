import { FC } from 'react';

import AdminNavigation from '@/ui/admin-navigation/AdminNavigation';
import Heading from '@/ui/heading/Heading';

import Meta from '@/utils/meta/Meta';

import Statistics from '@/screens/admin/home/statistics/Statistics';

const Admin: FC = () => {
  return (
    <Meta title={'Admin panel'}>
      <AdminNavigation />
      <Heading title={'Статистика'} />
      <Statistics />
    </Meta>
  );
};

export default Admin;
