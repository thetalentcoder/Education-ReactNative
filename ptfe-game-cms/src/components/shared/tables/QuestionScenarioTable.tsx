import { useState } from 'react';
import { BsPen, BsTrash3 } from 'react-icons/bs';

import { Scenario } from 'api/scenarios/types';
import { Pagination, SortProps, TableColumn } from 'types/table';

import { Checkbox } from 'components/ui/Checkbox';
import Table from 'components/ui/Table';
import { TableActions } from 'components/ui/TableActions';
// import { useAuthStore } from 'store/auth';
import { checkboxProps } from 'utils';

interface Props {
  isLoading: boolean;
  data: Scenario[];
  onDelete: (id: string) => void;
  onUpdate: (org: Scenario) => void;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  sort?: SortProps;
  pagination?: Pagination;
}

export const QuestionScenarioTable = ({
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
  // const { user } = useAuthStore();

  const isOneDigitNumber = (num: number) => num >= 0 && num < 10;

  const columns: TableColumn[] = [
    {
      key: 'title',
      name: 'Title',
      cell: (item: Scenario, i) => (
        <div className="flex items-center gap-3">
          <Checkbox {...checkboxProps(item._id, selected, setSelected)} />
          <span className="badge primary !p-3">
            {isOneDigitNumber(i + 1) ? '0' : null}
            {(i + 1).toLocaleString()}
          </span>
          {item.title}
          {/* <Link
            target="_blank"
            to={`/scenario?id=${item._id}`}
            className="flex items-center gap-2 cursor-pointer"
          >
            <p className="text-black whitespace-normal">{item.title}</p>
          </Link> */}
        </div>
      )
    },
    {
      key: 'questions',
      name: 'Questions',
      cell: (item: Scenario) => (
        <p className="break-words whitespace-normal gap-3">
        {item.questions.map(question => <p className=''>- {question.question}</p>)}
        </p>
        // <div className="flex flex-col gap-6">
        //   {
        //     item.questions.map(question => {
        //       return <Link
        //           id = {question._id}
        //           key = {question._id}
        //           target="_blank"
        //           to={`/questions-bank?search=${question._id}`}
        //           className="items-center cursor-pointer"
        //         >
        //           <span className='badge !p-3 primary'>{question.question}</span>
        //         </Link>
        //     })
        //   }
        // </div>
      )
    },
    {
      key: 'options',
      name: '',
      align: 'center',
      cell: (item: Scenario) => (
        <TableActions itemID={item._id} activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
          <li onClick={() => onUpdate(item)}>
            <BsPen className="text-light-200" /> Edit Scenario
          </li>

          <li onClick={() => onDelete(item._id)}>
            <BsTrash3 className="text-danger" />
            Delete Scenario
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
      className="questionScenarioTable"
    />
  );
};
