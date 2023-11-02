import { NextPage } from 'next';

import { NextPageAuth } from '@/shared/types/auth.types';

import GenreEdit from '@/screens/admin/genre-edit/GenreEdit';

const GenreEditPage: NextPageAuth = () => {
  return <GenreEdit />;
};

GenreEditPage.isOnlyAdmin = true;

export default GenreEditPage;
