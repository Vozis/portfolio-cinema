import { FC } from 'react';

import AdminActions from '@/ui/admin-table/admin-actions/AdminActions';
import { IAdminTableItem } from '@/ui/admin-table/admin-table.interface';

import styles from './AdminTable.module.scss';

const AdminTableItem: FC<IAdminTableItem> = ({ tableItem, removeHandler }) => {
  // console.log(tableItem);
  return (
    <div className={styles.item}>
      {tableItem.items.map(value => (
        <div key={value}>{value}</div>
      ))}
      <AdminActions editUrl={tableItem.editUrl} removeHandler={removeHandler} />
    </div>
  );
};

export default AdminTableItem;
