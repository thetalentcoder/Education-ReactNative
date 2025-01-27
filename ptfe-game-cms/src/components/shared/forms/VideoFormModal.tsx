import { useFormik } from 'formik';
import { TfiSave } from 'react-icons/tfi';
import { useMutation } from 'react-query';

import { addVideo, updateVideo } from 'api/video';
import { Video } from 'api/video/types';
import { Field } from 'components/ui/Field';
import { Modal } from 'components/ui/Modal';
import { videoSchema } from 'utils/yup';

interface Props {
  video?: Video | null;
  onClose: () => void;
  refetch: () => void;
}

export const VideoFormModal = ({ video, onClose, refetch }: Props) => {
  const onSuccess = () => {
    refetch();
    onClose();
  };

  const { mutate: add, isLoading: isLoadingAdd } = useMutation(addVideo, { onSuccess });
  const { mutate: update, isLoading: isLoadingUpdate } = useMutation(updateVideo, { onSuccess });

  const isLoading = isLoadingAdd || isLoadingUpdate;

  const formik = useFormik({
    initialValues: {
      title: video ? video?.title : '',
      description: video ? video?.description : '',
      vimeoId: video ? video?.vimeoId : '',
    },
    validationSchema: videoSchema,
    onSubmit: (values) =>
      video ? update({
        ...values,
        id: video._id,
      }) : add(values)
  });

  return (
    <Modal
      title={video ? 'Edit Video' : 'Create Video'}
      onClose={onClose}
      boxClassName="w-[500px]"
    >
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <Field label="Video Title" formik={formik} name="title" />
        <Field label="Video Description" formik={formik} name="description" />
        <Field label="Video Vimeo ID" formik={formik} name="vimeoId" type='number'/>

        <button type="submit" className="secondaryBtn w-fit mt-6" disabled={isLoading}>
          <TfiSave />
          {video ? 'Edit Video' : 'Create Video'}
        </button>
      </form>
    </Modal>
  );
};
