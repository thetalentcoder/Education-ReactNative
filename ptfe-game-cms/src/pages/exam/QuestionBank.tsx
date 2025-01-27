import { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { FaClipboardList } from 'react-icons/fa';
import { useMutation, useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

import { Question } from 'api/question/types';

import { deleteQuestions, fetchQuestions, fetchQuestionsCategories } from 'api/question';
import { USER_ADMIN } from 'api/users/types';
import { QuestionFormModal } from 'components/shared/forms/QuestionFormModal';
import { QuestionBankTable } from 'components/shared/tables/QuestionBankTable';
import { SearchField } from 'components/ui/SearchField';
import { useAuthStore } from 'store/auth';
import { fetchSingleQuestionAnalytics } from '../../api/analytics';
import { QuestionAnalytics } from '../../components/shared/modals/QuestionAnalytics';
import { SecurityModal } from '../../components/util/SecurityModal';
import { reactQueryConfig } from '../../lib/react-query';
import { Filters } from '../../types/global';
import ReactSelect from 'react-select';
import reactSelectStylesConfig from '../../lib/react-select';

export const QuestionBank = () => {
  const [itemForUpdate, setItemForUpdate] = useState<Question | null>(null);
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [isOpenSecurity, setIsOpenSecurity] = useState(false);
  const [questionIdForAnalytics, setQuestionIdForAnalytics] = useState('');

  const { data: categories } = useQuery(['categories'], fetchQuestionsCategories);
  // const { data: exams } = useQuery(['exams'], () => fetchExams({ limit: 100 }));
  // const examsOptions = exams?.result.map((group) => ({ label: group.name, value: group._id })) || [];

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [filters, setFilters] = useState<Filters>({
    limit: 10,
    page: 1,
    search: '',
    filter: {
      _id: (queryParams.get('search') as string) || '',
      sortByDate: -1
    }
  });

  const { user } = useAuthStore();
  const { mutate } = useMutation(deleteQuestions);

  const { data, refetch, isLoading } = useQuery(['question'], () => fetchQuestions(filters));

  const { data: questionAnalytics } = useQuery(
    [`analytics-${questionIdForAnalytics}`],
    () => fetchSingleQuestionAnalytics(questionIdForAnalytics),
    { enabled: Boolean(questionIdForAnalytics) }
  );

  const onDelete = (ids: string[]) =>
    mutate(ids, {
      onSuccess: () => {
        refetch();
        if (selected.length) setSelected([]);
      }
    });

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  useEffect(() => {
    if (filters.search || filters.filter.category || filters.filter.sortByDate || filters.filter.scenarioId) {
      setFilters((p) => ({ ...p }));
    }
  }, [filters.search, filters.filter.category, filters.filter.sortByDate, filters.filter.scenarioId]);

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 lg:static flex items-center justify-between gap-3 p-3 lg:p-5 bg-white z-50 shadow-card lg:shadow-none">
        <div className="flex items-center gap-4">
          <SearchField setSearchQuery={(val) => setFilters((p) => ({ ...p, search: val }))} />
          {/* <ReactSelect
            placeholder="Sort by date"
            styles={reactSelectStylesConfig}
            className="w-48"
            options={[
              { label: 'ASC', value: 1 },
              { label: 'DESC', value: -1 }
            ]}
            onChange={(val: any) => setFilters((p) => ({ ...p, filter: { ...p.filter, sortByDate: val?.value } }))}
          /> */}
          <ReactSelect
            placeholder="Filter by Scenario"
            styles={reactSelectStylesConfig}
            className="w-48"
            options={[
              { label: 'No filter' },
              { label: 'Scenario', value: true },
              { label: 'Non-Scenario', value: false }
            ]}
            onChange={(val: any) => setFilters((p) => ({ ...p, filter: { ...p.filter, scenarioId: val?.value } }))}
          />
          <ReactSelect
            placeholder="Filter by Category"
            styles={reactSelectStylesConfig}
            className="w-48"
            options={[{ label: 'No filter' }, ...(categories?.map((el) => ({ label: el.name, value: el._id })) || [])]}
            onChange={(val: any) => setFilters((p) => ({ ...p, filter: { ...p.filter, category: val?.value } }))}
          />
          {/* <ReactSelect
            placeholder="Filter by Exam"
            styles={reactSelectStylesConfig}
            className="w-48"
            options={[
              { label: 'No filter' },
              ...(exams?.result.map((el) => ({ label: el.name, value: el._id })) || [])
            ]}
            onChange={(val: any) => setFilters((p) => ({ ...p, filter: { ...p.filter, exam: val?.value } }))}
          /> */}
        </div>

        {isOpenSecurity && (
          <SecurityModal
            text={`Are you sure you want to delete ${selected.length} ${
              selected.length > 1 ? 'questions' : 'question'
            }?`}
            onClick={() => {
              onDelete(selected);
              setIsOpenSecurity(false);
              setSelected([]);
            }}
            btnText="Delete "
            close={() => {
              setSelected([]);
              setIsOpenSecurity(false);
            }}
          />
        )}

        <div className="flex items-center gap-6">
          {selected.length ? (
            <button
              className="iconBtn danger"
              onClick={() => {
                setSelected(selected);
                setIsOpenSecurity(true);
              }}
            >
              <BiTrash />
            </button>
          ) : null}
          {(user?.role === USER_ADMIN) && (
            <button className="secondaryBtn !capitalize" onClick={() => setIsOpenCreateModal(true)}>
              <FaClipboardList />
              New Question
            </button>
          )}
        </div>
      </div>
      <div className="p-5">
        <QuestionBankTable
          isLoading={isLoading}
          data={data?.result || []}
          onUpdate={(item) => setItemForUpdate(item)}
          onDelete={(id) => {
            setSelected([id]);
            setIsOpenSecurity(true);
          }}
          setQuestionIdForAnalytics={setQuestionIdForAnalytics}
          selected={selected}
          setSelected={setSelected}
          pagination={{ filters, setFilters, totalCount: data?.total || 0 }}
        />
      </div>
      {(isOpenCreateModal || itemForUpdate) && (
        <QuestionFormModal
          question={itemForUpdate}
          refetch={refetch}
          onClose={() => {
            setIsOpenCreateModal(false);
            setItemForUpdate(null);
          }}
        />
      )}

      {questionAnalytics ? (
        <QuestionAnalytics
          data={questionAnalytics}
          onClose={() => {
            reactQueryConfig.removeQueries([`analytics-${questionIdForAnalytics}`]);
            setQuestionIdForAnalytics('');
          }}
        />
      ) : null}
    </div>
  );
};
