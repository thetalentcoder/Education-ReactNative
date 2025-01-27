import { useState } from 'react';
import { useMutation } from 'react-query';
import { BiPlus, BiTrash } from 'react-icons/bi';

import { QuestionsCategory } from 'api/question/types';

import { QuestionCategoryFormModal } from 'components/shared/forms/QuestionCategoryFormModal';
import { QuestionCategoriesTable } from 'components/shared/tables/QuestionCategoriesTable';
import { deleteQuesionCategories, fetchQuestionsCategories } from 'api/question';

import { SearchField } from 'components/ui/SearchField';
import { useSortedData } from 'hooks/useSortedData';
import { useAuthStore } from 'store/auth';
import { USER_ADMIN } from 'api/users/types';
import { SecurityModal } from 'components/util/SecurityModal';

export const QuestionCategory = () => {
  const { user } = useAuthStore();
  const [itemForUpdate, setItemForUpdate] = useState<QuestionsCategory | null>(null);

  const [selected, setSelected] = useState<string[]>([]);

  const [isOpenSecurity, setIsOpenSecurity] = useState(false);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const { mutate } = useMutation(deleteQuesionCategories);

  const { search, isLoading, searchedData, refetch, sort } = useSortedData({
    queryFn: fetchQuestionsCategories,
    searchKeys: ['name'],
    queryKey: 'question-categories'
  });

  const onDelete = (ids: string[]) => {
    mutate(ids, {
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
        <div className="flex items-center gap-6">
          {selected.length ? (
            <button className="iconBtn danger" onClick={() => setIsOpenSecurity(true)}>
              <BiTrash />
            </button>
          ) : null}
          {(user?.role === USER_ADMIN) && (
            <button className="secondaryBtn !capitalize" onClick={() => setIsOpenCreateModal(true)}>
              <BiPlus />
              New category
            </button>
          )}
        </div>
        {isOpenSecurity && (
          <SecurityModal
            text={`Are you sure you want to delete ${selected.length} ${selected.length > 1 ? 'categories' : 'category'}?`}
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
      </div>
      <div className="p-5">
        <QuestionCategoriesTable
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

      {(isOpenCreateModal || itemForUpdate) && (
        <QuestionCategoryFormModal
          questionCategory={itemForUpdate}
          refetch={refetch}
          onClose={() => {
            setIsOpenCreateModal(false);
            setItemForUpdate(null);
          }}
        />
      )}
    </div>
  );
};
