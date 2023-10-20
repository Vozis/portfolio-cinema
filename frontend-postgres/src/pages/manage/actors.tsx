import { NextPageAuth } from '@/shared/types/auth.types';

import ActorList from '@/screens/admin/actors/ActorList';

const ActorsListPage: NextPageAuth = () => {
  return <ActorList />;
};

ActorsListPage.isOnlyAdmin = true;
export default ActorsListPage;
