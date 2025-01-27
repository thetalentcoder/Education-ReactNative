import { useFormik } from 'formik';
import { useMutation } from 'react-query';
import { TfiSave } from 'react-icons/tfi';

import { UpdateUserRequest } from 'api/auth/types';

import { Field } from 'components/ui/Field';
import { useAuthStore } from 'store/auth';
import { updatePasswordSchema } from 'utils/yup';
import { updateUserInfo } from 'api/auth';

const AccountSettings = () => {
  const { user, setUser } = useAuthStore();
  const { mutate, isLoading } = useMutation(updateUserInfo);

  const initialValues: UpdateUserRequest = {
    id: user?._id || '',
    email: user?.email || '',
    fullname: user?.fullname || '',
    newPassword: '',
    repeatNewPassword: ''
  };

  const formik = useFormik({
    initialValues,
    validationSchema: updatePasswordSchema,
    onSubmit: (values, { setErrors }) => {
      mutate(values, {
        onSuccess: (newUser) => {
          if (user && user._id && user.role) {
            setUser({
              _id: user._id,
              fullname: newUser.fullname,
              email: newUser.email,
              role: user.role,
              password: newUser.password.length === 0 ? user.password : newUser.password,
              subscription: user.subscription
            });
          }
        },
        onError: (error: any) => {}
      });
    }
  });

  return (
    <div className="p-6">
      <div className="paper p-4">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
          <p className="font-semibold">General Info</p>
          <Field label="Full Name" formik={formik} name="fullname" type="fullname"/>
          <Field label="Email Address" formik={formik} name="email" type="email" readOnly/>
          <p className="font-semibold">Reset Password</p>
          <Field label="Old Password" formik={formik} name="oldPassword" type="password" />
          <Field label="New Password" formik={formik} name="newPassword" type="password" />
          <Field label="Confirm New Password" formik={formik} name="repeatPassword" type="password" />
          <button type="submit" className="secondaryBtn w-fit mt-6" disabled={isLoading}>
            <TfiSave />
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;
