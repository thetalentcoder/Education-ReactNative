import ReactSelect, { Props as ReactSelectProps } from 'react-select';
import { FormikProps } from 'formik';

import { getFormikError, hasError } from 'utils/formik';
import reactSelectStylesConfig from 'lib/react-select';

interface Props {
  formik: FormikProps<any>;
  label: string;
  name: string;
}

export const Select = ({ formik, label, name, ...rest }: Props & ReactSelectProps) => {
  const error = getFormikError({ formik, name });
  const isInvalid = hasError({ formik, name });
  return (
    <div>
      <label className="fieldLabel">{label}</label>
      <ReactSelect styles={reactSelectStylesConfig} {...rest} />
      {isInvalid && <p className="text-xs text-danger mt-1">{error}</p>}
    </div>
  );
};
