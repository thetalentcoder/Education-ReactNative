import { useFormik } from 'formik';
// import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { LoginRequest } from 'api/auth/types';
import { USER_ADMIN, User } from 'api/users/types';

import { login } from 'api/auth';
import AuthBannerImg from 'assets/images/AuthBannerImg.png';
import { Field } from 'components/ui/Field';
import { toast } from 'react-toastify';
import { Pathnames } from 'routes/pathnames';
import { useAuthStore } from 'store/auth';
import { loginSchema } from 'utils/yup';

export const Login = () => {
  const { setUser } = useAuthStore();
  const { mutate, isLoading } = useMutation(login);
  const { setIsLogged } = useAuthStore();
  const navigate = useNavigate();

  // const [errorCount, setErrorCount] = useState(0);

  const formik = useFormik({
    initialValues: { email: '', password: '' } as LoginRequest,
    validationSchema: loginSchema,
    onSubmit: (values, { setErrors }) => {
      mutate(values, {
        onSuccess: (resp: any) => {
          console.log("Login Response ", resp);
          if (resp.success === true) {
            setIsLogged(true);
            let newUser: User = {
              _id: resp.data.uid,
              email: resp.data.email,
              fullname: 'Admin User',
              role: USER_ADMIN,
              password: values.password,
              subscription: resp.data.subscription
            };
            setUser(newUser);

            navigate(Pathnames.DASHBOARD);
          }
          else {
            console.log(resp.data.response.data.message);
            toast.error(`Wrong credential! Please check your email and password.`);
          }
        },
        onError: (data: any) => {
          // setErrors({ password: data.data.message });
          // setErrorCount((p) => p + 1);
        }
      });
    }
  });

  return (
    <div className="w-full h-screen overflow-hidden relative bg-primary flex items-center justify-center p-4">
      <img src={AuthBannerImg} alt="PTFE" className="absolute bottom-10 -left-20 hidden lg:block" />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative bg-white rounded-xl p-6 w-[400px]">
        <h1 className="text-[24px] lg:text-lg lg:leading-lg font-bold">Welcome back!</h1>
        <p className="text-base lg:text-md lg:leading-md font-semibold">Please log in using your account</p>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 md:gap-6 my-3 md:my-6">
          <Field label="Email" formik={formik} name="email" type="email" />
          <Field label="Password" formik={formik} name="password" type="password" />

          {/* <div className="flex flex-col gap-2">
            {errorCount >= 2 && (
              <p className="text-sm leading-sm bg-danger bg-opacity-20 text-danger p-2 rounded-md">
                This might not be your password. Try to reset it instead.
              </p>
            )}

            <Link to={Pathnames.FORGOT_PASSWORD} className="text-sm leading-sm">
              Forgot password?
            </Link>
          </div> */}

          <button type="submit" className="secondaryBtn w-full" disabled={isLoading}>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};
