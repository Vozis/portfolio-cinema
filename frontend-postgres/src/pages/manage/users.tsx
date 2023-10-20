import { NextPageAuth } from '@/shared/types/auth.types';

import UserList from '@/screens/admin/users/UserList';

const UsersListPage: NextPageAuth = () => {
  return <UserList />;
};

UsersListPage.isOnlyAdmin = true;
export default UsersListPage;
