import { ChangeEvent, FC } from 'react';

import AdminCreateButton from '@/ui/admin-table/admin-header/AdminCreateButton';
import SearchField from '@/ui/input/SearchField';

interface IAdminHeader {
  onClick?: () => void;
  searchTerm: string;
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AdminHeader: FC<IAdminHeader> = ({
  onClick,
  handleSearch,
  searchTerm,
}) => {
  return (
    <div className={'flex items-center justify-between gap-4 mt-8'}>
      <SearchField searchTerm={searchTerm} handleSearch={handleSearch} />
      {onClick ? <AdminCreateButton onClick={onClick} /> : null}
    </div>
  );
};

export default AdminHeader;
