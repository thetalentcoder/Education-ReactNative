import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { TfiSave } from 'react-icons/tfi';

import { Exam, ExamSchedule } from 'api/exams/types';
import { Org } from 'api/orgs/types';

import { updateExamSchedule } from 'api/exams';
import { reactQueryConfig } from 'lib/react-query';
import { examScheduleSchema } from 'utils/yup';
import { Field } from 'components/ui/Field';
import { Modal } from 'components/ui/Modal';
import { date } from 'yup';

interface Props {
  exam : Exam | null;
  initValue: ExamSchedule;
  onClose: () => void;
}

export const ExamScheduleFormModal = ({ initValue, exam = null, onClose }: Props) => {
  const onSuccess = () => {
    onClose();
  };

  const { mutate: updateSchedule, isLoading: isLoadingUpdate } = useMutation(updateExamSchedule, { onSuccess });

  const isLoading = isLoadingUpdate;
  const formik = useFormik({
    initialValues: {
      dateFrom: initValue?.dateFrom.slice(0, 10),
      dateTo: initValue?.dateTo.slice(0, 10),
     },
    validationSchema: examScheduleSchema,
    onSubmit: (({ dateFrom, dateTo }) => {
      if(exam)
        updateSchedule({ dateFrom, dateTo, examId: exam?._id })
    }),
  });

  return (
    <Modal
      title='Schedule Exam'
      onClose={onClose}
      boxClassName="w-[450px]"
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Field label="Date From" type="date" formik={formik} name="dateFrom" />
        <Field label="Date To" type="date" formik={formik} name="dateTo" />
        <button type="submit" className="secondaryBtn w-fit" disabled={isLoading}>
          <TfiSave />
          Schedule Exam
        </button>
      </form>
    </Modal>
  );
};
