import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { FaListAlt } from 'react-icons/fa';
import { BsTrash3 } from 'react-icons/bs';

import { Filters } from 'types/global';

import {
  deleteQuizzes,
  getQuizzesWithFilter,
} from 'api/exams';
import { CreateExamModal } from 'components/shared/forms/CreateExamModal'

import { SecurityModal } from 'components/util/SecurityModal';
import { SearchField } from 'components/ui/SearchField';
import { reactQueryConfig } from 'lib/react-query';
import { useAuthStore } from 'store/auth';

import { USER_ADMIN } from 'api/users/types';
import { QuizListTable } from 'components/shared/tables/QuizListTable';
import { Quiz } from 'api/exams/types';

export const QuizList = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCreateEditModal, setIsOpenCreateEditModal] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [isOpenSecurity, setIsOpenSecurity] = useState(false);
  const [itemForUpdate, setItemForUpdate] = useState<Quiz | null>(null);


  const { user } = useAuthStore();
  const { mutate } = useMutation(deleteQuizzes);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [filters, setFilters] = useState<Filters>({
    limit: 10,
    page: 1,
    search: '',
    filter: { category: queryParams.get('category') || '' }
  });

  const { data: quizData, refetch: quizRefetch, isLoading: quizIsloading } = useQuery(['quiz-list'], () => getQuizzesWithFilter(filters));

  const onDelete = (ids: string[]) =>
    mutate(ids, {
      onSuccess: () => {
        quizRefetch();
        if (selected.length) setSelected([]);
      }
    });


  useEffect(() => {
    quizRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);


  return (
    <div>
      <div className="fixed top-0 left-0 right-0 lg:static flex items-center justify-between gap-3 p-3 lg:p-5 bg-white z-50 shadow-card lg:shadow-none">
        <div className="flex items-center gap-3">
          <SearchField setSearchQuery={(val) => setFilters((p) => ({ ...p, search: val }))} />
        </div>

        {isOpenSecurity && (
          <SecurityModal
            text={`Are you sure you want to delete ${selected.length} exams?`}
            onClick={() => {
              onDelete(selected);
              setSelected([]);
              setIsOpenSecurity(false);
            }}
            btnText="Delete "
            close={() => {
              setSelected([]);
              setIsOpenSecurity(false);
            }}
          />
        )}

        <div className="flex items-center gap-3">
          {selected.length ? (
            <button
              className="iconBtn danger"
              onClick={() => {
                setIsOpenSecurity(true);
              }}
            >
              <BsTrash3 />
            </button>
          ) : null}

          {(user?.role === USER_ADMIN) && (
            <button
              className="secondaryBtn !capitalize"
              onClick={() => {
                setIsOpenModal(true);
                setIsOpenCreateEditModal(true);
              }}
            >
              <FaListAlt />
              New Quiz
            </button>
          )}
        </div>
      </div>
      <div className="p-5">
        <QuizListTable
          isLoading={quizIsloading}
          data={quizData?.result || []}
          onUpdate={(item) => {
            setIsOpenCreateEditModal(true);
            setItemForUpdate(item)
          }}
          onDelete={(id) => {
            setSelected([id]);
            setIsOpenSecurity(true);
          }}
          selected={selected}
          setSelected={setSelected}
          pagination={{ filters, setFilters, totalCount: quizData?.total || 0 }}
        />
      </div>


      {(isOpenModal || itemForUpdate) && isOpenCreateEditModal && (
        <CreateExamModal
          exam={itemForUpdate}
          refetch={quizRefetch}
          onClose={() => {
            setIsOpenModal(false);
            setItemForUpdate(null)
            setIsOpenCreateEditModal(false);
            reactQueryConfig.removeQueries(['single-exam']);
          }}
        />
      )}

    </div>
  );
};
