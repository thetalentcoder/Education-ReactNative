import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import { BsPen, BsTrash3 } from 'react-icons/bs';
import { GoReport } from 'react-icons/go';
import { GrDrag } from 'react-icons/gr';
import { FaPlay } from 'react-icons/fa';
import { BiCog } from 'react-icons/bi';
import dayjs from 'dayjs';

import { Pagination, SortProps, TableColumn } from 'types/table';
import { Exam, UpdateExamRequest } from 'api/exams/types';

import { TableActions } from 'components/ui/TableActions';
import { Checkbox } from 'components/ui/Checkbox';
import { useAuthStore } from 'store/auth';
import Table from 'components/ui/Table';
import { deleteExams, updateExam } from 'api/exams';
import { checkboxProps, isActiveClass } from 'utils';
import { SecurityModal } from '../../util/SecurityModal';
import { Switch } from '../../ui/Switch';
import { StudentAttemptBreakdownModal } from 'components/util/StudentAttemptBreakdownModal';
// import { StudentBreakdownModal } from 'components/util/StudentBreakdownModal';
import { VscDebugContinue } from 'react-icons/vsc';
import { toast } from 'react-toastify';
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
  setContinueExamId: React.Dispatch<React.SetStateAction<string>>;
}

export const ExamsTable = ({
  allExams,
  setAllExams,
  isLoading,
  setExamUpdateId,
  setTakeExam,
  refetch,
  sort,
  selected,
  setSelected,
  pagination,
  setContinueExamId
}: Props) => {
  const [activeMenu, setActiveMenu] = useState('');
  const [studentBreakdown, setStudentBreakdown] = useState<Exam | null>(null);
  const [ateemptBreakdown, setAttemptBreakdown] = useState<Exam | null>(null);

  const { user } = useAuthStore();
  const { mutate } = useMutation(deleteExams);

  const { mutate: onUpdate } = useMutation(updateExam);

  const isStudent = user?.role === USER_STUDENT;
  const isDraggable = user?.role === USER_ADMIN;

  const [deleteIds, setDeleteIds] = useState<string[]>([]);

  const onDelete = (ids: string[]) => {
    mutate(ids, {
      onSuccess: () => {
        refetch();
        setActiveMenu('');
      }
    });
  };

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
      key: 'drag',
      name: '',
      align: 'center',
      cell: (el, i, provided) => (
        <div {...provided.dragHandleProps}>
          <GrDrag className="w-4 h-4 cursor-grab" />
        </div>
      )
    },
    {
      key: 'name',
      name: 'Name',
      //sort: ['name'],
      cell: (item, i: number) => (
        <div className="flex items-center gap-3">
          <Checkbox {...checkboxProps(item._id, selected, setSelected)} />
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
        return (
          <span className="text-light-100 py-2 px-4 rounded-lg border border-light-100">
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
        // const takenExam = user?.examsTaken?.find((el) => el.exam === item._id);
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
    {
      key: 'status',
      name: 'Status',
      //sort: ['isActive'],
      align: 'center',
      cell: (item: Exam) => (
        <span className={`badge`}>
          <Switch isColumn isEnable={item.isActive} onToggle={() => onToggleStatus(item)} />
        </span>
      )
    },
    {
      key: 'play',
      name: 'Start Exam',
      align: 'center',
      cell: (item: Exam) => {
        // const index = user?.examsInProgress.findIndex((el) => el.examId === item._id);
        const index = undefined;
        const hasQuestions = item.sections.reduce((acc, section) => acc + section.questions.length, 0) > 0;

        return (
          <div>
            {index !== undefined && index !== -1 ? (
              <VscDebugContinue className="dotsIcon" onClick={() => setContinueExamId(item._id)} />
            ) : (
              <FaPlay
                className="dotsIcon"
                onClick={() => (hasQuestions ? setTakeExam(item._id) : toast.info('This exam has no questions'))}
              />
            )}
          </div>
        );
      }
    },
    {
      key: 'options',
      name: '',
      align: 'center',
      cell: (item: Exam) => {
        const takenExam = undefined;
        const studentTakenExam = 0
        const attepmts = isStudent ? studentTakenExam : item.statistics.timesTaken;

        return (
          <TableActions activeMenu={activeMenu} setActiveMenu={setActiveMenu} itemID={item._id}>
            {isStudent ? (
              <>
                {attepmts ? (
                  <li onClick={() => setAttemptBreakdown(item)}>
                    <GoReport /> Attempt Breakdown
                  </li>
                ) : null}
                {takenExam && (
                  <Link to={`/student-reports/${user._id}?examID=${item._id}`}>
                    <li>
                      <BiCog /> Exam performance
                    </li>
                  </Link>
                )}
              </>
            ) : (
              <>
                <li onClick={() => setStudentBreakdown(item)}>
                  <GoReport /> Breakdown
                </li>
                <li onClick={() => setExamUpdateId(item._id)}>
                  <BsPen className="text-light-200" /> Edit Exam
                </li>
                {user?.role === USER_ADMIN ? (
                  <li onClick={() => setDeleteIds([item._id])}>
                    <BsTrash3 className="text-danger" />
                    Delete Exam
                  </li>
                ) : null}
              </>
            )}
          </TableActions>
        );
      }
    }
  ];

  const filteredColumns = isStudent
    ? columns.filter(({ key }) => !['category', 'status', 'sections', 'questions', 'drag'].includes(key))
    : columns.filter(({ name }) => name !== 'Start Exam');

  return (
    <>
      <Table
        data={allExams}
        isLoading={isLoading}
        sort={sort}
        columns={filteredColumns}
        className={`${isActiveClass(isStudent, 'studentView')} examsTable`}
        pagination={pagination}
        draggable={isDraggable ? {
          onDragEnd: (result) => {
            if (!result.destination) return;
            const { source, destination, type } = result;

            if (type === 'droppableTableItem') {
              const array = Array.from(allExams);
              const [reorderedSection] = array.splice(source.index, 1);
              array.splice(destination.index, 0, reorderedSection);

              setAllExams(array);

              const exam = allExams.find(({ _id }) => _id === reorderedSection._id);

              if (!exam) return;

              const payload: UpdateExamRequest = {
                examId: exam._id,
                name: exam.name,
                category: exam.category._id,
                isActive: exam.isActive,
                minPassPercentage: exam.minPassPercentage,
                orderIndex: destination.index,
                sections: exam.sections.map(({ _id, ...rest }) => ({ ...rest }))
              };

              onUpdate(payload);
            }
          }
        }: null}
      />

      {deleteIds.length ? (
        <SecurityModal
          text="Are you sure you want to delete this Exam?"
          onClick={() => {
            onDelete(deleteIds);
            setDeleteIds([]);
          }}
          btnText="Delete Exam"
          close={() => setDeleteIds([])}
        />
      ) : null}

      {/* {studentBreakdown && <StudentBreakdownModal exam={studentBreakdown} onClose={() => setStudentBreakdown(null)} />} */}
      {/* {ateemptBreakdown && (
        <StudentAttemptBreakdownModal exam={ateemptBreakdown} onClose={() => setAttemptBreakdown(null)} />
      )} */}
    </>
  );
};
