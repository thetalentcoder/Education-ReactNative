import { useState } from 'react';
import { BsPen, BsTrash3 } from 'react-icons/bs';

import { Pagination, SortProps, TableColumn } from 'types/table';

import { SliderCard } from 'api/sliderCard/types';
import { Checkbox } from 'components/ui/Checkbox';
import Table from 'components/ui/Table';
import { TableActions } from 'components/ui/TableActions';
import { checkboxProps } from 'utils';

interface Props {
  isLoading: boolean;
  data: SliderCard[];
  onDelete: (id: string) => void;
  onUpdate: (org: SliderCard) => void;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  sort?: SortProps;
  pagination?: Pagination;
}

export const SliderCardTable = ({
  data,
  isLoading,
  sort,
  selected,
  setSelected,
  onUpdate,
  onDelete,
  pagination,
}: Props) => {
  const [activeMenu, setActiveMenu] = useState('');

  const isOneDigitNumber = (num: number) => num >= 0 && num < 10;

  const columns: TableColumn[] = [
    {
      key: 'title',
      name: 'Title',
      cell: (item: SliderCard, i) => (
        <div className="flex flex-1 items-center gap-3">
          <Checkbox {...checkboxProps(item._id, selected, setSelected)} />
          <span className="badge primary !p-3">
            {isOneDigitNumber(i + 1) ? '0' : null}
            {(i + 1).toLocaleString()}
          </span>
          {item.title}
        </div>
      )
    },
    {
      key: 'linkText',
      name: 'Link Text',
      cell: (item: SliderCard) => (
        <div>
          {item.linkText}
        </div>
      )
    },
    {
      key: 'url',
      name: 'Url',
      cell: (item: SliderCard) => (
        <div>
          {item.url}
        </div>
      )
    },
    {
      key: 'options',
      name: '',
      align: 'center',
      cell: (item: SliderCard) => (
        <TableActions itemID={item._id} activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
          <li onClick={() => onUpdate(item)}>
            <BsPen className="text-light-200" /> Edit Card
          </li>

          <li onClick={() => onDelete(item._id)}>
            <BsTrash3 className="text-danger" />
            Delete Card
          </li>
        </TableActions>
      )
    }
  ];

  return (
    <Table
      pagination={pagination}
      sort={sort}
      isLoading={isLoading}
      data={data}
      columns={columns}
      className="sliderCardTable"
    />
  );
};
