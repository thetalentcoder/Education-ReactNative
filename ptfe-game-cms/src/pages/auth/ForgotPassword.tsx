import { useState } from 'react';
import { useFormik } from 'formik';
import { useMutation } from 'react-query';

import AuthBannerImg from 'assets/images/AuthBannerImg.png';
import { Field } from 'components/ui/Field';
import { forgotPassword } from 'api/auth';

export const ForgotPassword = () => {
  const { mutate, isLoading } = useMutation(forgotPassword);

  const [isSent, setIsSent] = useState(false);

  const formik = useFormik({
    initialValues: { email: '' },
    onSubmit: ({ email }) => mutate({
      email,
      id: '',
      fullname: '',
      newPassword: '',
      repeatNewPassword: ''
    }, { onSuccess: () => setIsSent(true) })
  });

  return (
    <div className="w-full h-screen overflow-hidden relative bg-primary flex items-center justify-center p-4">
      <img src={AuthBannerImg} alt="PTFE" className="absolute bottom-10 -left-20 hidden lg:block" />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative bg-white rounded-xl p-6 w-[400px]">
        <h1 className="text-[24px] lg:text-lg lg:leading-lg mb-4 font-bold">Forgot password?</h1>
        <p className="text-sm leading-sm">Enter email of your account to receive a password reset link</p>
        <>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 md:gap-6 my-3 md:my-6">
            <Field required label="Email" formik={formik} name="email" type="email" />
            <button type="submit" className="secondaryBtn w-full" disabled={isLoading}>
              {isSent ? 'Mail sent successfully!' : 'Send reset mail'}
            </button>
          </form>
        </>
      </div>
    </div>
  );
};
