import { FC } from 'react';

import Button from '@/ui/form-elements/Button';

const AdminCreateButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button onClick={onClick} className={'bg-primary bg-opacity-80'}>
      Создать
    </Button>
  );
};

export default AdminCreateButton;
