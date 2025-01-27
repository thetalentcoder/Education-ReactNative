import { useFormik } from 'formik';
import { TfiSave } from 'react-icons/tfi';
import { useMutation } from 'react-query';

import { User } from 'api/users/types';

import { updateUserInfo } from 'api/auth';
import { Field } from 'components/ui/Field';
import { Modal } from 'components/ui/Modal';
import { Switch } from 'components/ui/Switch';
import { updateUserSchema } from 'utils/yup';
import { putUser } from 'api/users';

interface Props {
  user?: User | null;
  onClose: () => void;
}

export const UserFormModal = ({ user, onClose }: Props) => {
  const { mutate: putMutate, isLoading: putIsLoading } = useMutation(putUser);
  const initialValues = {
    fullname: user?.fullname || '',
    email: user?.email || '',
    role: user?.role || false,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: updateUserSchema,
    onSubmit: (values) => {
      if (user) {
        putMutate({
          ...values,
          id: user._id,
          newPassword: '',
          repeatNewPassword: '',
        }, { onSuccess });
      }
    }
  });

  const onSuccess = () => {
    onClose();
  };

  return (
    <Modal
      title={'Edit User'}
      onClose={onClose}
      boxClassName="w-full md:w-[700px]"
      contentClassName="overflow-y-auto h-[calc(100%-69px)]"
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col-reverse md:flex-row gap-5 items-start">
        <div className="flex-1 flex flex-col gap-6 w-full">
          <Field label="Full Name" formik={formik} name="fullname" />
          <Field label="Eamil" formik={formik} name="email" readOnly/>
          <Switch
            isEnable={formik.values.role == 1}
            onToggle={() => formik.setFieldValue('role', !formik.values.role)}
          />
          <button type="submit" className="secondaryBtn w-fit" /*disabled={postIsLoading || putIsLoading}*/>
            <TfiSave />
            Save User
          </button>
        </div>
      </form>
    </Modal>
  );
};
