import { useState } from 'react';
import { BsTrash3, BsPen } from 'react-icons/bs';

import { ExamsCategory } from 'api/exams/types';
import { SortProps, TableColumn } from 'types/table';

import { TableActions } from 'components/ui/TableActions';
import { Checkbox } from 'components/ui/Checkbox';
import Table from 'components/ui/Table';
import { checkboxProps } from 'utils';
import { useAuthStore } from 'store/auth';
import { USER_ADMIN } from 'api/users/types';

interface Props {
  isLoading: boolean;
  data: ExamsCategory[];
  onDelete: (id: string) => void;
  onUpdate: (org: ExamsCategory) => void;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  sort: SortProps;
}

export const ExamCategoryTable = ({ isLoading, onUpdate, onDelete, sort, data, selected, setSelected }: Props) => {
  const [activeMenu, setActiveMenu] = useState('');

  const { user } = useAuthStore();

  const columns: TableColumn[] = [
    {
      key: 'name',
      name: 'Track name',
      sort: ['name'],
      cell: (el: ExamsCategory, i) => (
        <div className="flex items-center gap-3">
          <Checkbox {...checkboxProps(el._id, selected, setSelected)} />
          <span className="badge primary !p-3">0{(i + 1).toLocaleString()}</span>
          {el.name}
        </div>
      )
    },
    {
      key: 'actions',
      name: '',
      align: 'center',
      cell: (el: ExamsCategory) => (
        <TableActions activeMenu={activeMenu} setActiveMenu={setActiveMenu} itemID={el._id}>
          <li onClick={() => onUpdate(el)}>
            <BsPen className="text-light-200" /> Edit Track
          </li>
          {user?.role === USER_ADMIN ? (
            <li onClick={() => onDelete(el._id)}>
              <BsTrash3 className="text-danger" />
              Delete Track
            </li>
          ) : null}
        </TableActions>
      )
    }
  ];

  return <Table sort={sort} isLoading={isLoading} data={data} columns={columns} className="examCategoryTable" />;
};
