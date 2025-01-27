import { FormikProps } from 'formik';

import { getFormikError, hasError } from 'utils/formik';

interface Props {
  formik: FormikProps<any>;
  label?: string;
  name: string;
  placeholder?: string;
}

export type InputT = Props & React.InputHTMLAttributes<HTMLInputElement>;

export const Textarea = ({ label, formik, name, placeholder }: InputT) => {
  const error = getFormikError({ formik, name });
  const isInvalid = hasError({ formik, name });

  return (
    <div className={`form-group ${isInvalid ? 'invalid' : 'valid'}`}>
      {label && <label className="fieldLabel">{label}</label>}
      <textarea
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={(e) => formik.setFieldValue(name, e.target.value)}
      />
      {isInvalid && <p className="text-xs text-danger mt-1">{error}</p>}
    </div>
  );
};
