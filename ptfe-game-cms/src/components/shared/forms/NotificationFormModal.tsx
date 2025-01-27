import { useFormik } from 'formik';
import { TfiSave } from 'react-icons/tfi';
import { useMutation } from 'react-query';

import { createNotification, editNotification } from 'api/notification';
import { Notification } from 'api/notification/types';
import { Field } from 'components/ui/Field';
import { Modal } from 'components/ui/Modal';
import { notificationSchema } from 'utils/yup';

interface Props {
  notification?: Notification | null;
  onClose: () => void;
  refetch: () => void;
}

export const NotificationFormModal = ({ notification, onClose, refetch }: Props) => {
  const onSuccess = () => {
    refetch();
    onClose();
  };

  const { mutate: add, isLoading: isLoadingAdd } = useMutation(createNotification, { onSuccess });
  const { mutate: update, isLoading: isLoadingUpdate } = useMutation(editNotification, { onSuccess });

  const isLoading = isLoadingAdd || isLoadingUpdate;

  const formik = useFormik({
    initialValues: {
      title: notification ? notification?.title : '',
      message: notification ? notification?.message : '',
    },
    validationSchema: notificationSchema,
    onSubmit: (values) =>
      notification ? update({
        ...values,
        id: notification._id,
      }) : add(values)
  });

  return (
    <Modal
      title={notification ? 'Edit Notification' : 'Create Notification'}
      onClose={onClose}
      boxClassName="w-[500px]"
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Field label="Notification Title" formik={formik} name="title" />
        <Field label="Notification Text" formik={formik} name="message" />

        <button type="submit" className="secondaryBtn w-fit mt-6" disabled={isLoading}>
          <TfiSave />
          {notification ? 'Edit Notification' : 'Create Notification'}
        </button>
      </form>
    </Modal>
  );
};
