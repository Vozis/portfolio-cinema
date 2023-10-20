import { NextPage } from 'next';

import { NextPageAuth } from '@/shared/types/auth.types';

import UserEdit from '@/screens/admin/user-edit/UserEdit';

const UserEditPage: NextPageAuth = () => {
  return <UserEdit />;
};

UserEditPage.isOnlyAdmin = true;

export default UserEditPage;
