import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { useMutation } from 'react-query';

import { ExamsCategory } from 'api/exams/types';

import { deleteExamCategories, fetchExamsCategories } from 'api/exams';
import { USER_ADMIN } from 'api/users/types';
import { ExamCategoryFormModal } from 'components/shared/forms/ExamCategoryFormModal';
import { ExamCategoryTable } from 'components/shared/tables/ExamCategoryTable';
import { SearchField } from 'components/ui/SearchField';
import { useSortedData } from 'hooks/useSortedData';
import { useAuthStore } from 'store/auth';
import { SecurityModal } from '../../components/util/SecurityModal';

export const QuizTrack = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [itemForUpdate, setItemForUpdate] = useState<ExamsCategory | null>(null);

  const { mutate: deleteMutate } = useMutation(deleteExamCategories);
  const { user } = useAuthStore();
  const { isLoading, refetch, search, searchedData, sort } = useSortedData({
    searchKeys: ['name'],
    queryKey: 'exams-categories',
    queryFn: fetchExamsCategories
  });

  const [isOpenSecurity, setIsOpenSecurity] = useState(false);

  const onDelete = (ids: string[]) => {
    deleteMutate(ids, {
      onSuccess: () => {
        refetch();
        if (selected.length) setSelected([]);
      }
    });
  };

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 lg:static flex items-center justify-between gap-3 p-3 lg:p-5 bg-white z-50 shadow-card lg:shadow-none">
        <SearchField {...search} />

        {isOpenSecurity && (
          <SecurityModal
            text={`Are you sure you want to delete ${selected.length} exam ${
              selected.length > 1 ? 'tracks' : 'track'
            }?`}
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
          {(user?.role === USER_ADMIN) && (
            <button className="secondaryBtn" onClick={() => setIsOpenModal(true)}>
              <BiPlus />
              <span className="hidden lg:inline">New Track</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <ExamCategoryTable
          sort={sort}
          isLoading={isLoading}
          data={searchedData}
          onUpdate={(item) => setItemForUpdate(item)}
          onDelete={(id) => {
            setIsOpenSecurity(true);
            setSelected([id]);
          }}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
      {(isOpenModal || itemForUpdate) && (
        <ExamCategoryFormModal
          examCategory={itemForUpdate}
          onClose={() => {
            setIsOpenModal(false);
            setItemForUpdate(null);
          }}
        />
      )}
    </div>
  );
};
