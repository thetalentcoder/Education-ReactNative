import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { BsPen, BsTrash3 } from 'react-icons/bs';
import { GoReport } from 'react-icons/go';
import { FaPlay } from 'react-icons/fa';
import { BiCog } from 'react-icons/bi';
import dayjs from 'dayjs';

import { Pagination, SortProps, TableColumn } from 'types/table';
import { Exam, UpdateExamRequest, ExamSchedule } from 'api/exams/types';

import { TableActions } from 'components/ui/TableActions';
import { Checkbox } from 'components/ui/Checkbox';
import { useAuthStore } from 'store/auth';
import Table from 'components/ui/Table';
import { deleteExams, fetchSingleExamSchedule, updateExam } from 'api/exams';
import { checkboxProps, isActiveClass } from 'utils';
import { SecurityModal } from '../../util/SecurityModal';
import { Switch } from '../../ui/Switch';
import { StudentAttemptBreakdownModal } from 'components/util/StudentAttemptBreakdownModal';
import { StudentBreakdownModal } from 'components/util/StudentBreakdownModal';
import { VscDebugContinue } from 'react-icons/vsc';
import { toast } from 'react-toastify';
import { AiOutlineSchedule } from 'react-icons/ai';
import { ExamScheduleFormModal } from 'components/shared/forms/ExamScheduleFormModal';
import { USER_ADMIN, USER_STUDENT } from 'api/users/types';

interface Props {
  allExams: Exam[];
  isLoading: boolean;
  setExamUpdateId: (examId: string) => void;
  setTakeExam: (id: string) => void;
  refetch: () => void;
  sort?: SortProps;
  selected: string[];
  pagination?: Pagination;
  setAllExams: React.Dispatch<React.SetStateAction<Exam[]>>;
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ScheduledExamsTable = ({
  allExams,
  isLoading,
  refetch,
  sort,
  selected,
  setSelected,
  pagination,
}: Props) => {
  const onSuccess = (data: ExamSchedule) => {
    //reactQueryConfig.refetchQueries(['exams-categories']);
    setInitExamSchedule(data);
  };

  const [activeMenu, setActiveMenu] = useState('');
  const [scheduleExam, setScheduleExam] = useState<Exam | null>(null);
  const [initExamSchedule, setInitExamSchedule] = useState<ExamSchedule | null>(null);

  const { user } = useAuthStore();
  const { mutate } = useMutation(deleteExams);
  const { mutate: onUpdate } = useMutation(updateExam);
  const { mutate: fetchSchedule } = useMutation(fetchSingleExamSchedule, { onSuccess });
  const isOrgAdmin = user?.role === USER_ADMIN;
  const isStudent = user?.role === USER_STUDENT;

  const onToggleStatus = (exam: Exam) => {
    const paylaod: UpdateExamRequest = {
      examId: exam._id,
      category: exam.category._id,
      isActive: !exam.isActive,
      minPassPercentage: exam.minPassPercentage,
      name: exam.name,
      sections: exam.sections.map(({ _id, ...rest }) => ({ ...rest }))
    };

    onUpdate(paylaod, { onSuccess: () => refetch() });
  };

  const columns: TableColumn[] = [
    {
      key: 'name',
      name: 'Name',
      //sort: ['name'],
      cell: (item, i: number) => (
        <div className="flex items-center gap-3">
          {user?.role === USER_ADMIN ? <Checkbox {...checkboxProps(item._id, selected, setSelected)} /> : null}
          <span className="badge primary !p-3">0{(i + 1).toLocaleString()}</span>
          {item.name}
        </div>
      )
    },
    {
      key: 'category',
      name: 'Track',
      //sort: ['category.name'],
      align: 'center',
      cell: ({ category }: Exam) => (
        <span className={`badge !p-3 ${category.name === 'PTA' ? 'danger' : 'primary'}`}>{category.name}</span>
      )
    },
    {
      key: 'attempts',
      name: 'Attempts',
      align: 'center',
      //sort: ['statistics.timesTaken'],
      cell: (item: Exam) => {
        const takenExam = undefined;
        const studentTakenExam = 0;

        return (
          <span className="text-light-100 py-2 px-4 rounded-lg border border-light-100">
            {isStudent ? studentTakenExam : item.statistics.timesTaken}
          </span>
        );
      }
    },
    {
      key: 'passing',
      name: 'Average Score',
      //sort: ['statistics.averageScore'],
      align: 'center',
      cell: (item: Exam) => {
        const takenExam = undefined;
        const studentAvgScore = 0;
        const globalAvgScore = item.statistics.averageScore || 0;
        const passing = isStudent ? studentAvgScore : globalAvgScore;

        return <span className={passing >= 50 ? 'text-success-100' : 'text-danger'}>{`${Math.floor(passing)}%`}</span>;
      }
    },
    {
      key: 'minPassPercentage',
      name: 'Min Passing %',
      //sort: ['minPassPercentage'],
      align: 'center',
      cell: (item: Exam) => `${item.minPassPercentage}%`
    },
    {
      key: 'sections',
      name: 'Sections',
      //sort: ['sections.length'],
      align: 'center',
      cell: (item: Exam) => (
        <span className="text-light-100 py-2 px-4 rounded-lg border border-light-100">{item.sections.length}</span>
      )
    },
    {
      key: 'questions',
      name: 'Questions',
      //sort: ['sections.questions.length'],
      align: 'center',
      cell: (item: Exam) => (
        <span className="text-light-100 py-2 px-4 rounded-lg border border-light-100">
          {item.sections.reduce((acc, section) => acc + section.questions.length, 0)}
        </span>
      )
    },
    /*
    {
      key: 'status',
      name: 'Status',
      sort: ['isActive'],
      align: 'center',
      cell: (item: Exam) => (
        <span className={`badge`}>
          <Switch isColumn isEnable={item.isActive} onToggle={() => onToggleStatus(item)} />
        </span>
      )
    },
    */
    {
      key: 'options',
      name: '',
      align: 'center',
      cell: (item: Exam) => {
        return (
          <TableActions activeMenu={activeMenu} setActiveMenu={setActiveMenu} itemID={item._id}>
              <>
                <li onClick={() => {
                  setScheduleExam(item); 
                  fetchSchedule(item._id);
                }}>
                  <AiOutlineSchedule /> Schedule
                </li>
              </>
          </TableActions>
        );
      }
    }
  ];

  return (
    <>
      <Table
        data={allExams}
        isLoading={isLoading}
        sort={sort}
        columns={columns}
        className={`scheduledExamsTable`}
        pagination={pagination}
      />
      {(scheduleExam && initExamSchedule) && <ExamScheduleFormModal initValue = {initExamSchedule} exam={scheduleExam} onClose={() =>{ setScheduleExam(null); setInitExamSchedule(null);}} />}
    </>
  );
};
