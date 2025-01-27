import { useLocation, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';

import { ResetPasswodPayload } from 'api/auth/types';

import AuthBannerImg from 'assets/images/AuthBannerImg.png';
import { resetPasswordSchema } from 'utils/yup';
import { Pathnames } from 'routes/pathnames';
import { Field } from 'components/ui/Field';
import { resetPassword } from 'api/auth';

export const SetPassword = () => {
  const { search } = useLocation();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(resetPassword);

  const resetToken = new URLSearchParams(search).get('resetToken') || '';

  const formik = useFormik<ResetPasswodPayload>({
    initialValues: {
      resetToken,
      newPassword: '',
      repeatNewPassword: '',
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) =>
      mutate(values, {
        onSuccess: () => navigate(Pathnames.LOGIN),
      }),
  });

  return (
    <div className="w-full h-screen overflow-hidden relative bg-primary flex items-center justify-center p-4">
      <img src={AuthBannerImg} alt="PTFE" className="absolute bottom-10 -left-20 hidden lg:block" />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative bg-white rounded-xl p-6 w-[400px]">
        <h1 className="text-[24px] lg:text-lg lg:leading-lg mb-4 font-bold text-center">Welcome</h1>
        <h1 className="text-[24px] lg:text-lg lg:leading-lg mb-4 font-bold">Please set your password</h1>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 md:gap-6 my-3 md:my-6">
          <Field label="Password" type="password" formik={formik} name="newPassword" />
          <Field label="Repeat Password" type="password" formik={formik} name="repeatNewPassword" />
          <button type="submit" className="secondaryBtn w-full" disabled={isLoading}>
            Set password
          </button>
        </form>
      </div>
    </div>
  );
};
