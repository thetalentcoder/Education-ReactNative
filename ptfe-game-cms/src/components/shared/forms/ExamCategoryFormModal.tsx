import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { TfiSave } from 'react-icons/tfi';

import { ExamsCategory, Exam } from 'api/exams/types';

import { addExamCategory, updateExamCategory } from 'api/exams';
import { reactQueryConfig } from 'lib/react-query';
import { examCategorySchema } from 'utils/yup';
import { Field } from 'components/ui/Field';
import { Modal } from 'components/ui/Modal';

interface Props {
  examCategory?: ExamsCategory | null;
  onClose: () => void;
}

export const ExamCategoryFormModal = ({ examCategory = null, onClose }: Props) => {
  const onSuccess = () => {
    reactQueryConfig.refetchQueries(['exams-categories']);
    onClose();
  };

  const { mutate: add, isLoading: isLoadingAdd } = useMutation(addExamCategory, { onSuccess });
  const { mutate: update, isLoading: isLoadingUpdate } = useMutation(updateExamCategory, { onSuccess });

  const isLoading = isLoadingAdd || isLoadingUpdate;

  const formik = useFormik({
    initialValues: { name: examCategory ? examCategory?.name : '' },
    validationSchema: examCategorySchema,
    onSubmit: ({ name }) => (examCategory ? update({ quizTrackId: examCategory._id, name }) : add(name))
  });

  return (
    <Modal
      title={examCategory ? 'Edit Exam Track' : 'Create Exam Track'}
      onClose={onClose}
      boxClassName="w-[450px]"
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Field label="Track name" formik={formik} name="name" />
        <button type="submit" className="secondaryBtn w-fit" disabled={isLoading}>
          <TfiSave />
          Save Exam Track
        </button>
      </form>
    </Modal>
  );
};
