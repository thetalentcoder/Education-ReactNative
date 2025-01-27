import { useState } from 'react';
import dayjs from 'dayjs';
import { BsPen, BsTrash3 } from 'react-icons/bs';

import { QuestionsCategory } from 'api/question/types';
import { SortProps, TableColumn } from 'types/table';

import { TableActions } from 'components/ui/TableActions';
import { Checkbox } from 'components/ui/Checkbox';
import Table from 'components/ui/Table';
import { checkboxProps } from 'utils';
import { useAuthStore } from 'store/auth';

interface Props {
  isLoading: boolean;
  data: QuestionsCategory[];
  onDelete: (id: string) => void;
  onUpdate: (org: QuestionsCategory) => void;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  sort: SortProps;
}

export const QuestionCategoriesTable = ({
  data,
  sort,
  isLoading,
  selected,
  setSelected,
  onUpdate,
  onDelete
}: Props) => {
  const [activeMenu, setActiveMenu] = useState<string>('');

  const { user } = useAuthStore();

  const columns: TableColumn[] = [
    {
      key: 'name',
      name: 'Name',
      sort: ['name'],
      cell: (item: QuestionsCategory, i: number) => (
        <div className="flex items-center gap-3">
          {user?.role !== 0 ? <Checkbox {...checkboxProps(item._id, selected, setSelected)} /> : null}
          <span className="badge primary !p-3">0{(i + 1).toLocaleString()}</span>
          <span>{item.name}</span>
        </div>
      )
    },
    {
      key: 'subcategories',
      name: 'Subcategories',
      cell: (item: QuestionsCategory) => (
        <p className="break-words whitespace-normal gap-3">
        {item.subcategories.map(sub => sub).join(', ')}
        </p>
      )
    },
    // {
    //   key: 'createdAt',
    //   name: 'Created at',
    //   sort: ['createdAt'],
    //   cell: (item: QuestionsCategory) => (
    //     <span>{dayjs(item.createdAt).format('DD/MM/YYYY')}</span>
    //   )
    // },
    {
      key: 'options',
      name: '',
      cell: (item: QuestionsCategory) => (
        <TableActions itemID={item._id} activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
          <li onClick={() => onUpdate(item)}>
            <BsPen className="text-light-200" /> Edit Category
          </li>
          {user?.role !== 0 ? (
            <li onClick={() => onDelete(item._id)}>
              <BsTrash3 className="text-danger" />
              Delete Category
            </li>
          ) : null}
        </TableActions>
      )
    }
  ];

  return <Table sort={sort} isLoading={isLoading} data={data} columns={columns} className="questionCategoriesTable" />;
};
