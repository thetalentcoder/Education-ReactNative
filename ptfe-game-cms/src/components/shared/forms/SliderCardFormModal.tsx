import { useFormik } from 'formik';
import { TfiSave } from 'react-icons/tfi';
import { useMutation } from 'react-query';
import { addSliderCard, updateSliderCard } from 'api/sliderCard';
import { SliderCard } from 'api/sliderCard/types';
import { Field } from 'components/ui/Field';
import { Modal } from 'components/ui/Modal';
import { sliderCardSchema } from 'utils/yup';

interface Props {
  sliderCard?: SliderCard | null;
  onClose: () => void;
  refetch: () => void;
}

export const SliderCardFormModal = ({ sliderCard, onClose, refetch }: Props) => {
  const onSuccess = () => {
    refetch();
    onClose();
  };

  const { mutate: add, isLoading: isLoadingAdd } = useMutation(addSliderCard, { onSuccess });
  const { mutate: update, isLoading: isLoadingUpdate } = useMutation(updateSliderCard, { onSuccess });

  const isLoading = isLoadingAdd || isLoadingUpdate;

  const formik = useFormik({
    initialValues: {
      title: sliderCard ? sliderCard?.title : '',
      linkText: sliderCard ? sliderCard?.linkText : '',
      url: sliderCard? sliderCard?.url: '',
    },
    validationSchema: sliderCardSchema,
    onSubmit: (values) =>
      sliderCard ? update({
        ...values,
        id: sliderCard._id,
      }) : add(values)
  });

  return (
    <Modal
      title={sliderCard ? 'Edit Card' : 'Create Card'}
      onClose={onClose}
      boxClassName="w-[500px]"
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Field label="Card Title" formik={formik} name="title" />
        <Field label="Link Text" formik={formik} name="linkText" />
        <Field label="Url" formik={formik} name="url" />

        <button type="submit" className="secondaryBtn w-fit mt-6" disabled={isLoading}>
          <TfiSave />
          {sliderCard ? 'Edit Card' : 'Create Card'}
        </button>
      </form>
    </Modal>
  );
};
