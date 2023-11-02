import { NextPageAuth } from '@/shared/types/auth.types';

import MovieAdminList from '@/screens/admin/movies/MovieAdminList';

const UsersListPage: NextPageAuth = () => {
  return <MovieAdminList />;
};

UsersListPage.isOnlyAdmin = true;
export default UsersListPage;
