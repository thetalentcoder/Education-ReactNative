import { useMutation } from 'react-query';
import { useFormik } from 'formik';
import TagsInput from 'react-tagsinput';
import { TfiSave } from 'react-icons/tfi';

import { addQuestionCategory, updateQuestionCategory } from 'api/question';
import { QuestionsCategory } from 'api/question/types';

import { questionCategorySchema } from 'utils/yup';
import { Modal } from 'components/ui/Modal';
import { Field } from 'components/ui/Field';

interface Props {
  questionCategory?: QuestionsCategory | null;
  onClose: () => void;
  refetch: () => void;
}

export const QuestionCategoryFormModal = ({ questionCategory, onClose, refetch }: Props) => {
  const onSuccess = () => {
    refetch();
    onClose();
  };

  const { mutate: add, isLoading: isLoadingAdd } = useMutation(addQuestionCategory, { onSuccess });
  const { mutate: update, isLoading: isLoadingUpdate } = useMutation(updateQuestionCategory, { onSuccess });

  const isLoading = isLoadingAdd || isLoadingUpdate;

  const formik = useFormik({
    initialValues: {
      name: questionCategory ? questionCategory?.name : '',
      subcategories: questionCategory ? questionCategory?.subcategories : []
    },
    validationSchema: questionCategorySchema,
    onSubmit: (values) =>
      questionCategory ? update({ questionCategoryId: questionCategory._id, ...values }) : add(values)
  });

  return (
    <Modal
      title={questionCategory ? 'Edit Question Category' : 'Create Question Category'}
      onClose={onClose}
      boxClassName="w-[500px]"
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Field label="Category name" formik={formik} name="name" />

        <div className="multiInput">
          <label className="fieldLabel">Subcategories</label>
          <TagsInput
            value={formik.values.subcategories}
            onChange={(value) => formik.setFieldValue('subcategories', value)}
          />
        </div>
        <button type="submit" className="secondaryBtn w-fit mt-6" disabled={isLoading}>
          <TfiSave />
          Save Category
        </button>
      </form>
    </Modal>
  );
};
