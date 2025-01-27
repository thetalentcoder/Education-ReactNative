import { FormikProps } from 'formik';
import get from 'lodash/get';

interface Props {
  formik: FormikProps<any>;
  name: string;
}

export const hasError = ({ formik, name }: Props) => get(formik.touched, name) && get(formik.errors, name);

export const getFormikError = ({ formik, name }: Props): any => {
  if (!hasError({ formik, name })) return '';

  return get(formik.errors, name);
};

export const getFormikValue = ({ formik, name }: Props) => {
  const value = get(formik.values, name);

  if (value === undefined) return '';

  return value;
};
