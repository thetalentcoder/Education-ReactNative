import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { BiPlus, BiTrash } from 'react-icons/bi';
import { MdDragIndicator, MdEdit } from 'react-icons/md';
import { TfiSave } from 'react-icons/tfi';
import { useMutation, useQuery } from 'react-query';

import { Question } from 'api/question/types';

import { fetchExamsCategories, storeExam, updateExam } from 'api/exams';
import { fetchQuestionsById, fetchQuestionsFaster } from 'api/question';
import { Field } from 'components/ui/Field';
import { Modal } from 'components/ui/Modal';
import { Select } from 'components/ui/Select';
import { Switch } from 'components/ui/Switch';
import { SecurityModal } from 'components/util/SecurityModal';
import { examSchema } from 'utils/yup';
import { QuestionFormModal } from './QuestionFormModal';

interface Props {
  exam: any | undefined;
  onClose: () => void;
  refetch: () => void;
}

interface FormikValues {
  name: string;
  isActive: boolean;
  category: string;
  minPassPercentage: number;
  availableTo: {
    organizations: string[];
    groups: string[];
  };
  questions: string[];
}

export const CreateExamModal = ({ exam, onClose, refetch }: Props) => {
  const [isOpenCreateQuestionModal, setIsOpenCreateQuestionModal] = useState<{ isOpen: boolean; index?: number }>({
    isOpen: false,
    index: undefined
  });
  const [questionForUpdate, setQuestionForUpdate] = useState<Question | null>(null);
  const [questions, setQuestionss] = useState<any>([])

  const [isOpenSecurityModal, setIsOpenSecurityModal] = useState(false);
  const [deleteItemIndex, setDeleteItemIndex] = useState(0);

  const [deleteQuestionModal, setDeleteQuestionModal] = useState<{
    isOpen: boolean;
    sIndex?: number;
    qIndex?: number;
  }>({
    isOpen: false,
    sIndex: 0,
    qIndex: 0
  });

  const { data: examsCategories } = useQuery(['exams-categories'], fetchExamsCategories);
  const { data: itemQuestions, refetch: itemQuestionsRefetch } = useQuery(
    ['item-questions', exam?.questions],
    () => {
      return fetchQuestionsById(exam?.questions)
    },
    { enabled: !!exam?.questions }
  );
  const { data: question, refetch: refetchQuestions } = useQuery(['questions'], () => fetchQuestionsFaster());

  const { mutate: storeExamMutation, isLoading: storeIsLoading } = useMutation(storeExam);
  const { mutate: updateExamMutation, isLoading: updateIsLoading } = useMutation(updateExam);
  // console.log('My questions', exam?.questions)
  // console.log('My questions', itemQuestions)

  const initialValues: FormikValues = {
    name: exam?.title || '',
    isActive: exam?.isActive ?? false,
    category: '',
    minPassPercentage: 50,
    availableTo: { organizations: [], groups: [] },
    questions: []
  };

  useEffect(() => {
    itemQuestionsRefetch()
  }, [exam, itemQuestionsRefetch])

  useEffect(() => {
    if (itemQuestions) {
      setQuestionss(itemQuestions);
    }
  }, [itemQuestions]);

  const formik = useFormik({ initialValues, validationSchema: examSchema, onSubmit: (v) => onSubmit(v) });

  const categoriesOptions = examsCategories?.map((c) => ({ label: c.name, value: c.name }));

  const onSubmit = (values: FormikValues) => {
    const questionIds = questions.map((question: Question) => question._id)
    const body: any = {
      ...values,
      name: values.name,
      isActive: values.isActive,
      category: examsCategories?.find((c) => c.name === values.category)?._id || '',
      questions: questionIds
    };

    if (exam) return updateExamMutation({ ...body, examId: exam?._id }, { onSuccess });
    storeExamMutation(body, { onSuccess });
  };

  const onSuccess = () => {
    refetch();
    onClose();
  };

  const onAddSection = () => {
    return setIsOpenCreateQuestionModal({ isOpen: true });
  };


  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const updatedQuestions = Array.from(questions);
    const [movedQuestion] = updatedQuestions.splice(result.source.index, 1);
    updatedQuestions.splice(result.destination.index, 0, movedQuestion);

    setQuestionss(updatedQuestions);
  };



  const getOnDeleteMessage = () => {
    return 'Are you sure you want to delete question No ' + (deleteItemIndex + 1);
  };

  const handleDeleteQuestion = (deleteItemIndex: number) => {
    setQuestionss((prev: any) => prev.filter((_: any, index: number) => index !== deleteItemIndex));
  };

  return (
    <Modal
      title={exam ? `Edit Quiz: ${exam.title}` : 'Create Quiz'}
      onClose={() => setIsOpenSecurityModal(true)}
      wrapperClassName="!justify-end !p-0"
      boxClassName="!rounded-r-none max-h-screen h-screen w-[calc(100vw-272px)]"
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

      <form onSubmit={formik.handleSubmit} className="-m-5">
        <div className="p-5 border-b border-secondary">
          <div className="grid gap-4 items-start" style={{ gridTemplateColumns: '1fr 1fr 150px' }}>
            <Field label="Title" formik={formik} name="name" />
            <Select
              formik={formik}
              label="Track"
              name="category"
              options={categoriesOptions}
              value={categoriesOptions?.find((c) => c.value === formik.values.category) || ''}
              onChange={(value: any) => formik.setFieldValue('category', value.value)}
            />
            <Switch
              label="Status"
              isEnable={formik.values.isActive}
              onToggle={() => formik.setFieldValue('isActive', !formik.values.isActive)}
            />
          </div>
        </div>
        <div className="p-5">
          <button type="button" className="secondaryBtn w-fit mb-5" onClick={onAddSection}>
            <BiPlus />
            Add Question
          </button>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppableQuestions">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="mt-4 border border-tertiary rounded-xl">
                  {questions?.length > 0 && questions.map((q: any, qIndex: any) => (
                    <Draggable key={q._id} draggableId={`question-${q._id}`} index={qIndex}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="p-3 border-b border-tertiary last:border-b-0"
                        >
                          <div
                            className="grid items-center gap-4 w-full"
                            style={{ gridTemplateColumns: '1fr auto' }}
                          >
                            <div
                              className="text-sm leading-sm font-medium grid items-center gap-2"
                              style={{ gridTemplateColumns: 'auto 1fr auto' }}
                            >
                              <div className="flex items-center gap-1">
                                <div className="cursor-move" {...provided.dragHandleProps}>
                                  <MdDragIndicator className="w-5 h-5 text-secondary" />
                                </div>
                                <span>{qIndex + 1}.</span>
                              </div>
                              <p className="text-black">{q.question}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex flex-col gap-1.5">
                                {q.categories?.map(({ subcategories }: any) =>
                                  subcategories.map((subcatgory: any) => (
                                    <div className="badge primary" key={subcatgory}>{subcatgory}</div>
                                  ))
                                )}
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <div className="badge danger">{q?.examCategory?.name}</div>
                              </div>
                              <div className="flex items-center gap-2">
                                <MdEdit
                                  className="w-5 h-5 cursor-pointer text-secondary"
                                  onClick={() => {
                                    setQuestionForUpdate(q);
                                  }}
                                />
                                <BiTrash
                                  className="w-5 h-5 cursor-pointer text-danger"
                                  onClick={() => {
                                    setDeleteQuestionModal({
                                      isOpen: true,
                                      qIndex,
                                    })
                                    setDeleteItemIndex(qIndex)
                                  }

                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <button
          type="submit"
          className="secondaryBtn fixed top-3 right-4 w-fit"
          disabled={storeIsLoading || updateIsLoading}
        >
          <TfiSave />
          Save Changes
        </button>
      </form>

      {deleteQuestionModal.isOpen ? (
        <SecurityModal
          btnText="Delete"
          className="max-w-sm"
          close={() => setDeleteQuestionModal({ isOpen: false })}
          text={getOnDeleteMessage()}
          onClick={() => {
            handleDeleteQuestion(deleteItemIndex)
            setDeleteQuestionModal({ isOpen: false })
          }}
        />
      ) : null}
      {(isOpenCreateQuestionModal.isOpen || questionForUpdate) && (
        <QuestionFormModal
          onClose={() => {
            setIsOpenCreateQuestionModal({ isOpen: false });
            setQuestionForUpdate(null);
          }}
          selectCreatedQuestion={(q: Question) => {
            setQuestionss((prev: any) => {
              const existingIndex = prev.findIndex((question: any) => question._id === q._id);

              if (existingIndex !== -1) {
                // Replace existing question
                const updatedQuestions = [...prev];
                updatedQuestions[existingIndex] = q;
                return updatedQuestions;
              } else {
                // Add new question
                return [...prev, q];
              }
            })

          }}
          question={questionForUpdate}
          refetch={refetchQuestions}
        />
      )}
    </Modal>
  );
};
