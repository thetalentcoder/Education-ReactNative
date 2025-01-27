import { useState } from 'react';
import { BsPen, BsTrash3 } from 'react-icons/bs';

import { USER_ADMIN, User } from 'api/users/types';
import { useAuthStore } from 'store/auth';
import { Pagination, SortProps, TableColumn } from 'types/table';
import { checkboxProps } from 'utils';

import { Checkbox } from 'components/ui/Checkbox';
import Table from 'components/ui/Table';
import { TableActions } from 'components/ui/TableActions';

interface Props {
  isLoading: boolean;
  data: User[];
  sort?: SortProps;
  onUpdate: (user: User) => void;
  onDelete: (id: string) => void;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  pagination?: Pagination;
}

export const UserTable = ({
  isLoading,
  data,
  sort,
  onUpdate,
  onDelete,
  selected,
  setSelected,
  pagination
}: Props) => {
  const { user } = useAuthStore();

  const [activeMenu, setActiveMenu] = useState('');
  
  const columns: TableColumn[] = [
    {
      key: 'name',
      name: 'User Name',
      sort: ['fullname'],
      cell: (el: User, i) => (
        <div className="flex items-center gap-3">
          {user?.role === USER_ADMIN ? <Checkbox {...checkboxProps(el._id, selected, setSelected)} /> : null}
          <span className="badge primary !p-3">0{(i + 1).toLocaleString()}</span>
          <span>{`${el.fullname}`}</span>
        </div>
      )
    },
    {
      key: 'email',
      name: 'Email',
      sort: ['email'],
      cell: (el: User) => el.email
    },
    {
      key: 'role',
      name: 'User Role',
      sort: ['role'],
      cell: (el: User) => (el.role === USER_ADMIN ? "admin" : "student")
    },
    {
      key: 'subscription',
      name: 'Subscription',
      sort: ['subscription'],
      cell: (el: User) => (el.subscription)
    },
    {
      key: 'actions',
      name: '',
      align: 'center',
      cell: (el: User) => (
        <TableActions activeMenu={activeMenu} setActiveMenu={setActiveMenu} itemID={el._id}>
          {(user?.role === USER_ADMIN) && (
            <li onClick={() => onUpdate(el)}>
              <BsPen className="text-light-200" />
                Edit User
            </li>
          )}
          {(user?.role === USER_ADMIN) && (
            <li onClick={() => onDelete(el._id)}>
              <BsTrash3 className="text-danger" />
                Delete User
            </li>
          )}
        </TableActions>
      )
    }
  ];


  const modifiedColumns =
    user?.role === USER_ADMIN
      ? columns.filter((column) => column.key !== 'organization') // Remove 'Organization' column
      : columns;

  return (
    <>
      <Table
        pagination={pagination}
        isLoading={isLoading}
        sort={sort}
        data={data}
        columns={modifiedColumns}
        className={'userTable'}
      />
    </>
  );
};