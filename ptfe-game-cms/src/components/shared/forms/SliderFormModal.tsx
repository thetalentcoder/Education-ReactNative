import { useFormik } from 'formik';
import { TfiSave } from 'react-icons/tfi';
import { useMutation } from 'react-query';

import { addSlider, updateSlider } from 'api/slider';
import { Slider } from 'api/slider/types';
import { Field } from 'components/ui/Field';
import { Modal } from 'components/ui/Modal';
import { sliderSchema } from 'utils/yup';

interface Props {
  slider?: Slider | null;
  onClose: () => void;
  refetch: () => void;
}

export const SliderFormModal = ({ slider, onClose, refetch }: Props) => {
  const onSuccess = () => {
    refetch();
    onClose();
  };

  const { mutate: add, isLoading: isLoadingAdd } = useMutation(addSlider, { onSuccess });
  const { mutate: update, isLoading: isLoadingUpdate } = useMutation(updateSlider, { onSuccess });

  const isLoading = isLoadingAdd || isLoadingUpdate;

  const formik = useFormik({
    initialValues: {
      title: slider ? slider?.title : '',
      content: slider ? slider?.content : '',
    },
    validationSchema: sliderSchema,
    onSubmit: (values) =>
      slider ? update({
          ...values,
          id: slider._id,
          content: ''
      }) : add(values)
  });

  return (
    <Modal
      title={slider ? 'Edit Slider' : 'Create Slider'}
      onClose={onClose}
      boxClassName="w-[500px]"
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Field label="Slider Title" formik={formik} name="title" />
        <Field label="Slider content" formik={formik} name="content" />

        <button type="submit" className="secondaryBtn w-fit mt-6" disabled={isLoading}>
          <TfiSave />
          {slider ? 'Edit Slider' : 'Create Slider'}
        </button>
      </form>
    </Modal>
  );
};
