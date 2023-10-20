import { NextPage } from 'next';

import { NextPageAuth } from '@/shared/types/auth.types';

import Admin from '@/screens/admin/Admin';

const IndexPage: NextPageAuth = () => {
  return <Admin />;
};

IndexPage.isOnlyAdmin = true;

export default IndexPage;
