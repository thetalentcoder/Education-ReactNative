import { useState } from 'react';
import { BsPen, BsTrash3 } from 'react-icons/bs';

import { Question } from 'api/question/types';
import { Pagination, SortProps, TableColumn } from 'types/table';

import { USER_ADMIN } from 'api/users/types';
import { Checkbox } from 'components/ui/Checkbox';
import Table from 'components/ui/Table';
import { TableActions } from 'components/ui/TableActions';
import { useAuthStore } from 'store/auth';
import { checkboxProps } from 'utils';

interface Props {
  isLoading: boolean;
  data: Question[];
  onDelete: (id: string) => void;
  onUpdate: (org: Question) => void;
  selected: string[];
  setQuestionIdForAnalytics: React.Dispatch<React.SetStateAction<string>>;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  sort?: SortProps;
  pagination?: Pagination;
}

export const QuestionBankTable = ({
  data,
  isLoading,
  sort,
  selected,
  setSelected,
  onUpdate,
  onDelete,
  pagination,
  setQuestionIdForAnalytics
}: Props) => {
  const [activeMenu, setActiveMenu] = useState('');
  const { user } = useAuthStore();

  const isOneDigitNumber = (num: number) => num >= 0 && num < 10;

  const columns: TableColumn[] = [
    {
      key: 'question',
      name: 'Question',
      cell: (item: Question, i) => (
        <div className="flex items-center gap-3">
          {user?.role === USER_ADMIN ? <Checkbox {...checkboxProps(item._id, selected, setSelected)} /> : null}
          <span className="badge primary !p-3">
            {isOneDigitNumber(i + 1) ? '0' : null}
            {(i + 1).toLocaleString()}
          </span>
          <p className="text-black whitespace-normal">{item.question}</p>
        </div>
      )
    },
    // {
    //   key: 'examsUsedIn',
    //   name: 'Exams used in',
    //   align: 'center',
    //   sort: ['exams.name'],
    //   cell: (item: Question) => (
    //     <p className="break-words whitespace-normal">
    //       {item.exams?.length ? item.exams.map((exam) => exam.name).join(', ') : 'None'}
    //     </p>
    //   )
    // },
    {
      key: 'subcategories',
      name: 'Subcategories',
      align: 'center',
      sort: ['categories.category'],
      cell: (item: Question) => (
        <p className="break-words whitespace-normal">
          {item.categories
            .map(({ subcategories }) => subcategories.map((subcategory) => subcategory).join(', '))
            .join(', ')}
        </p>
      )
    },
    {
      key: 'cateogryName',
      name: 'Tracks',
      align: 'center',
      sort: ['examCategory.name'],
      cell: (item: Question) => <span className="capitalize">{item.examCategory?.name}</span>
    },
    {
      key: 'hasScenario',
      name: 'Scenario',
      align: 'center',
      sort: ['scenarioId'],
      cell: (item: Question) => <span className="capitalize">{item.scenarioId?"Y":"N"}</span>
    },
    {
      key: 'status',
      name: 'Status',
      align: 'center',
      sort: ['isActive'],
      cell: (item: Question) => (
        <span className={`badge ${item.isActive ? 'success' : 'secondary'}`}>
          {item.isActive ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'options',
      name: '',
      align: 'center',
      cell: (item: Question) => (
        <TableActions itemID={item._id} activeMenu={activeMenu} setActiveMenu={setActiveMenu}>
          <li onClick={() => onUpdate(item)}>
            <BsPen className="text-light-200" /> Edit Question
          </li>

          {user?.role === USER_ADMIN ? (
            <li onClick={() => onDelete(item._id)}>
              <BsTrash3 className="text-danger" />
              Delete Question
            </li>
          ) : null}

          {/* <li onClick={() => setQuestionIdForAnalytics(item._id)}>
            <TbReportAnalytics className="text-danger" />
            Question Analytics
          </li> */}
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
      className="questionTable"
    />
  );
};
