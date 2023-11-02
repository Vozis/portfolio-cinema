import { NextPageAuth } from '@/shared/types/auth.types';

import GenreList from '@/screens/admin/genres/GenreList';

const MoviesListPage: NextPageAuth = () => {
  return <GenreList />;
};

MoviesListPage.isOnlyAdmin = true;
export default MoviesListPage;
