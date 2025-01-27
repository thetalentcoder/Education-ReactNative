import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useFormik } from 'formik';

import { RegisterRequest, UpdateUserRequest } from 'api/auth/types';

import AuthBannerImg from 'assets/images/AuthBannerImg.png';
import { Pathnames } from 'routes/pathnames';
import { Field } from 'components/ui/Field';
import  {registerSchema} from 'utils/yup';
import { useAuthStore } from 'store/auth';
import { register } from 'api/auth';

export const Register = () => {
  const { mutate, isLoading } = useMutation(register);
  const { setIsLogged } = useAuthStore();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: ''
    },
    validationSchema: registerSchema,
    onSubmit: (values, { setErrors }) => {
      const payload: UpdateUserRequest = {
        id: "placeholder-id", // Replace this with the actual ID logic
        fullname: values.name,
        email: values.email,
        newPassword: values.password,
        repeatNewPassword: values.repeatPassword
      };

      mutate(payload, {
        onSuccess: () => {
          setIsLogged(true);
          navigate(Pathnames.DASHBOARD);
        },
        onError: (error: any) => {
          const message = error?.response?.data?.message || "An unexpected error occurred";
          setErrors({ email: message });
        },
      });
    },
  });

  return (
    <div className="w-full h-screen overflow-hidden relative bg-primary flex items-center justify-center p-4">
      <img src={AuthBannerImg} alt="PTFE" className="absolute bottom-10 -left-20 hidden lg:block" />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative bg-white rounded-xl p-4 md:p-6 w-full md:w-[400px]">
        <h1 className="text-[24px] lg:text-lg lg:leading-lg font-bold">Create Account</h1>
        <p className="text-base lg:text-md lg:leading-md font-semibold">Please Fill In the Information</p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 md:gap-6 mt-3 md:my-6">
          <Field label="Full Name" formik={formik} name="name" type="text" />
          <Field label="Email" formik={formik} name="email" type="email" />
          <Field label="Password" formik={formik} name="password" type="password" />
          <Field label="Confirm Password" formik={formik} name="repeatPassword" type="password" />
          <button type="submit" className="secondaryBtn w-full" disabled={isLoading}>
            Create an account
          </button>
        </form>
        <a href={Pathnames.LOGIN} className="text-sm leading-sm text-center block">
          Already have an account? Login
        </a>
      </div>
    </div>
  );
};