import { useQuery } from '@tanstack/react-query';
import cn from 'clsx';
import { FC } from 'react';

import SkeletonLoader from '@/ui/skeleton/SkeletonLoader';

import styles from '../../Admin.module.scss';

import { AdminService } from '@/services/admin.service';

const StatisticsCountUsers: FC = () => {
  const { isLoading, data: response } = useQuery(['count-users'], () =>
    AdminService.getCountUsers(),
  );
  return (
    <div className={cn(styles.block, styles.countUsers)}>
      <div>
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <div className={styles.number}>{response?.data}</div>
        )}
        <div className={styles.description}>Users</div>
      </div>
    </div>
  );
};

export default StatisticsCountUsers;
