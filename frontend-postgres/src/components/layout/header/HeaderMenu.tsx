import dynamic from 'next/dynamic';
import { FC } from 'react';

const DynamicAuthItems = dynamic(
  () => import('@/layout/header/auth/AuthItems'),
  {
    ssr: false,
  },
);
const HeaderMenu: FC = () => {
  return (
    <div>
      <DynamicAuthItems />
    </div>
  );
};

export default HeaderMenu;
