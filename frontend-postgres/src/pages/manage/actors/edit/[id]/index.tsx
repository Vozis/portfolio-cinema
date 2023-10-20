import { NextPageAuth } from '@/shared/types/auth.types';

import ActorEdit from '@/screens/admin/actors-edit/ActorEdit';

const ActorsEditPage: NextPageAuth = () => {
  return <ActorEdit />;
};

ActorsEditPage.isOnlyAdmin = true;

export default ActorsEditPage;
