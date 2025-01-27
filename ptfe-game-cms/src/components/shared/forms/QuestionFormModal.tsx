import { useFormik } from 'formik';
import groupBy from 'lodash/groupBy';
import { useEffect, useState } from 'react';
import { BiTrash } from 'react-icons/bi';
import { MdQuestionAnswer } from 'react-icons/md';
import { TfiSave } from 'react-icons/tfi';
import { useMutation, useQuery } from 'react-query';

import { PostQuestionRequest, Question } from 'api/question/types';

import { fetchExamsCategories } from 'api/exams';
import { fetchQuestionsCategories, storeQuestion, updateQuestion } from 'api/question';
import { Checkbox } from 'components/ui/Checkbox';
import { Modal } from 'components/ui/Modal';
import { Select } from 'components/ui/Select';
import { Switch } from 'components/ui/Switch';
import { createQuestionSchema } from 'utils/yup';
import { Dropzone } from '../../ui/Dropzone';

import { getScenarios } from 'api/scenarios';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import { SecurityModal } from '../../util/SecurityModal';
import { Field } from 'components/ui/Field';

interface Props {
  question?: Question | null;
  onClose: () => void;
  refetch: () => void;
  selectCreatedQuestion?: (q: Question) => void;
}

interface FormikState {
  image?: any;
  vimeoId?: string;
  deleteImage: boolean;
  isActive: boolean;
  question: string;
  answerExplanation: string;
  examCategory?: string;
  subcategories: Array<string>;
  answers: Array<{ answer: string; correct: boolean }>;
  scenario: string;
  scenarioId: string;
}

export const QuestionFormModal = ({ question, refetch, onClose, selectCreatedQuestion }: Props) => {
  const [isEnabledScenario, setIsEnabledScenario] = useState(question?.scenarioId != null);
  const [isOpenSecurityModal, setIsOpenSecurityModal] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<{ label: string; value: string; scenario: string }>();

  const { data: categories } = useQuery(['questions-categories'], fetchQuestionsCategories);
  const { data: scenarios } = useQuery(['scenarios-all'], getScenarios);
  const { mutate: storeMutate, isLoading: isLoadingStore } = useMutation(storeQuestion);
  const { mutate: updateMutate, isLoading: isLoadingUpdate } = useMutation(updateQuestion);
  const { data: examsCategories } = useQuery(['exams-categories'], fetchExamsCategories);

  const isLoading = isLoadingStore || isLoadingUpdate;
  const examCategoriesOptions = examsCategories?.map((c) => ({ label: c.name, value: c.name }));
  const groupedCategoriesOptions = categories?.map((c) => ({
    label: c.name,
    options: c.subcategories.map((s) => ({ label: s, value: s }))
  }));
  const scenarioOptions = scenarios?.result.map((c) => ({ label: c.title, value: c._id, scenario: c.scenario }));

  useEffect(() => {
    scenarios?.result
      .filter((c) => c._id === question?.scenarioId)
      .map((item) => {
        setSelectedScenario({ label: item.title, value: item._id, scenario: item.scenario });
      });
  }, [question, scenarios]);
  const initialValues: FormikState = {
    question: question?.question?.trim() || '',
    image: question?.image || '',
    vimeoId: question?.vimeoId || '',
    deleteImage: false,
    isActive: question?.isActive ?? true,
    answerExplanation: question?.answerExplanation || '',
    subcategories: question?.categories.map((c) => c.subcategories).flat() || [],
    // examCategory: examsCategories?.find((c) => c._id === question?.examCategory?._id)?._id || '',
    examCategory: question?.examCategory?.name || '',
    answers: question?.answers
      ? question.answers.map((a) => ({ answer: a.answer, correct: a.correct }))
      : Array.from({ length: 4 }, () => ({ answer: '', correct: false })),
    scenario: question?.scenario || '',
    scenarioId: selectedScenario?.value || ''
  };

  const formik = useFormik({ initialValues, validationSchema: createQuestionSchema, onSubmit: (v) => onSubmit(v) });

  const onSubmit = (state: FormikState) => {
    const groupedCategories = groupBy(
      state.subcategories,
      (s) => categories?.find((c: any) => c.subcategories.includes(s))?._id || ''
    );
    const body: PostQuestionRequest = {
      ...state,
      examCategory: examsCategories?.find((c) => c.name === state.examCategory)?._id || '',
      categories: Object.entries(groupedCategories).map(([name, subcategories]) => ({
        category: name,
        subcategories
      }))
    };
    if (body.answers.filter((v) => v.correct === true).length !== 1) {
      toast.error('Please select a correct answer.');
      return;
    }

    const formData = new FormData();
    if (question) formData.append('questionId', question._id);
    formData.append('question', body.question);
    formData.append('answerExplanation', body.answerExplanation);
    formData.append('isActive', body.isActive ? 'true' : 'false');
    formData.append('categories', JSON.stringify(body.categories));
    formData.append('answers', JSON.stringify(body.answers));
    formData.append('examCategory', body.examCategory);
    if (isEnabledScenario && selectedScenario?.value) formData.append('scenarioId', selectedScenario.value);

    if (body.image) formData.append('image', body.image);
    if (body.deleteImage) formData.append('deleteImage', 'true');
    if (body.vimeoId) formData.append('vimeoId', body.vimeoId);
    
    if (question) return updateMutate(formData, { onSuccess });
    storeMutate(formData, { onSuccess });
  };

  const onSuccess = (question: Question) => {
    if (selectCreatedQuestion) selectCreatedQuestion(question);
    refetch();
    onClose();
  };

  return (
    <Modal
      title={question ? 'Edit Question' : 'Create Question'}
      onClose={() => setIsOpenSecurityModal(true)}
      boxClassName="w-[1200px]"
      contentClassName="overflow-y-auto h-[calc(100%-69px)]"
    >
      {isOpenSecurityModal && (
        <SecurityModal
          close={() => setIsOpenSecurityModal(false)}
          text="Are you sure you want to leave?"
          btnText="Leave"
          onClick={onClose}
        />
      )}
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <label className="text-xs font-semibold text-label block">Question</label>
        <textarea
          value={formik.values.question}
          placeholder="Enter question..."
          className="border border-gray-300 min-h-100 p-4 rounded-lg resizable"
          onChange={(e) => formik.setFieldValue('question', e.target.value)}
        />
        <div className="grid gap-3 grid-cols-2">
          <div>
            <Select
              className="mb-4"
              isMulti
              formik={formik}
              label="Categories"
              name="subcategories"
              options={groupedCategoriesOptions}
              value={formik.values.subcategories.map((s) => ({ label: s, value: s }))}
              onChange={(value: any) => {
                const subs = value.map((v: any) => v.value);
                formik.setFieldValue('subcategories', subs);
              }}
            />
            <Field label="Vimeo Id" formik={formik} name="vimeoId" />
            <Select
              formik={formik}
              label="Tracks"
              name="examCategory"
              options={examCategoriesOptions}
              value={examCategoriesOptions?.find((c) => c.value === formik.values.examCategory) || ''}
              onChange={(value: any) => formik.setFieldValue('examCategory', value.value)}
            />
            <Switch
              label="Status"
              isEnable={formik.values.isActive}
              onToggle={() => formik.setFieldValue('isActive', !formik.values.isActive)}
            />
          </div>
          <Dropzone
            defaultImg={formik.values.image}
            onDrop={(img) => formik.setFieldValue('image', img)}
            onDelete={() => formik.setValues({ ...formik.values, image: '', deleteImage: true })}
          />
        </div>
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-semibold">Answers</h3>
          <button
            className="secondaryBtn"
            onClick={() => formik.setFieldValue('answers', [...formik.values.answers, { answer: '', correct: false }])}
          >
            <MdQuestionAnswer />
            Add Answer
          </button>
          <button
            className="secondaryBtn"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText('°');
            }}
          >
            Copy °
          </button>
        </div>
        <div className="grid gap-3 grid-cols-2">
          {formik.values.answers.map((_, aIndex) => (
            <div key={aIndex}>
              <div className="flex items-center justify-between pr-1">
                <div className="flex items-center gap-2 mb-2">
                  <label className="fieldLabel !m-0">Answer {aIndex + 1}</label>
                  <Checkbox
                    isChecked={formik.values.answers[aIndex].correct}
                    onToggle={() => {
                      const answers = [...formik.values.answers];
                      answers.forEach((a, i) => {
                        if (i === aIndex) a.correct = !a.correct;
                        else a.correct = false;
                      });
                      formik.setFieldValue('answers', answers);
                    }}
                  />
                  <p className="text-sm">Correct</p>
                </div>
                <BiTrash
                  onClick={() =>
                    formik.setFieldValue(
                      'answers',
                      formik.values.answers.filter((_, i) => i !== aIndex)
                    )
                  }
                  className="w-5 h-5 text-danger cursor-pointer"
                />
              </div>
              {/* <textarea
                placeholder="Write answer here..."
                value={formik.values.answers[aIndex].answer}
                onChange={(e) => formik.setFieldValue(`answers[${aIndex}].answer`, e.target.value)}
              /> */}
              <JoditEditor
                value={formik.values.answers[aIndex].answer}
                onBlur={(val) => formik.setFieldValue(`answers[${aIndex}].answer`, val)}
              />
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold">Answer Explanation</h3>
        <JoditEditor
          value={formik.values.answerExplanation}
          onBlur={(val) => formik.setFieldValue(`answerExplanation`, val)}
        />

        <h3 className="text-xl font-semibold">Scenario</h3>
        <Switch
          inRow
          label="Have scenario?"
          isEnable={isEnabledScenario}
          onToggle={() => setIsEnabledScenario((p) => !p)}
          legend={false}
        />

        {isEnabledScenario && (
          <Select
            formik={formik}
            label=""
            name="scenarioId"
            isDisabled={!isEnabledScenario}
            value={selectedScenario}
            options={scenarioOptions}
            onChange={(value: any) => {
              setSelectedScenario(value);
              formik.setFieldValue('scenarioId', value.value);
            }}
          />
        )}

        {isEnabledScenario && (
          <JoditEditor
            value={selectedScenario?.scenario ? selectedScenario.scenario : ''}
            {...{ config: { readonly: true } }}
          />
        )}

        <button type="submit" className="secondaryBtn w-fit mt-6" disabled={isLoading}>
          <TfiSave />
          Save Question
        </button>
      </form>
    </Modal>
  );
};
