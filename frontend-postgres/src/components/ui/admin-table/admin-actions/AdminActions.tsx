import { useRouter } from 'next/router';
import { FC } from 'react';

import { MaterialIcon } from '@/ui/MaterialIcon';

import styles from './AdminActions.module.scss';

interface IAdminActions {
  editUrl: string;
  removeHandler: () => void;
}

const AdminActions: FC<IAdminActions> = ({ removeHandler, editUrl }) => {
  const { push } = useRouter();

  return (
    <div className={styles.actions}>
      <button onClick={() => push(editUrl)}>
        <MaterialIcon name={'MdEdit'} />
      </button>
      <button
        onClick={() => {
          if (window.confirm('Ты действительно хочешь удалить товар?')) {
            removeHandler();
          }
        }}
      >
        <MaterialIcon name={'MdClose'} />
      </button>
    </div>
  );
};

export default AdminActions;
