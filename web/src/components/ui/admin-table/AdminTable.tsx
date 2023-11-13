import { FC } from 'react';

import AdminTableHeader from '@/ui/admin-table/AdminTableHeader';
import AdminTableItem from '@/ui/admin-table/AdminTableItem';
import { ITableItem } from '@/ui/admin-table/admin-table.interface';
import SkeletonLoader from '@/ui/skeleton/SkeletonLoader';

import styles from './AdminTable.module.scss';

interface IAdminTable {
  tableItems: ITableItem[];
  isLoading: boolean;
  headerItems: string[];
  removeHandler: (id: number) => void;
}

const AdminTable: FC<IAdminTable> = ({
  headerItems,
  isLoading,
  tableItems,
  removeHandler,
}) => {
  // console.log(tableItems);

  return (
    <div>
      <AdminTableHeader headerItems={headerItems} />
      {isLoading ? (
        <SkeletonLoader count={1} height={48} className={'mt-4'} />
      ) : tableItems.length ? (
        tableItems.map(tableItem => (
          <AdminTableItem
            key={tableItem.id + 'id'}
            tableItem={tableItem}
            removeHandler={() => removeHandler(tableItem.id)}
          />
        ))
      ) : (
        <div className={styles.notFound}>Элементы не найдены</div>
      )}
    </div>
  );
};

export default AdminTable;
