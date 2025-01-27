import { useState } from 'react';
import { FileDropzone } from '../../ui/FileDropzone';
import { Modal } from '../../ui/Modal';
import { BsUpload } from 'react-icons/bs';
import { useMutation } from 'react-query';

interface Props {
  onClose: () => void;
  refetch: () => void;
  asyncFunc: (props?: any) => Promise<any>;
  exampleFile?: {
    name: string;
    path: string;
  };
}

export const UploadCSVModal = ({ onClose, refetch, asyncFunc, exampleFile }: Props) => {
  const [csv, setCsv] = useState<File>();
  const { mutate } = useMutation(asyncFunc, {
    onSuccess: () => {
      refetch();
      onClose();
    }
  });

  return (
    <Modal
      title="Upload CSV file"
      onClose={onClose}
      boxClassName="w-auto"
      contentClassName="overflow-y-auto h-[calc(100%-69px)]"
    >
      <FileDropzone defaultFileName="" onDrop={(csv) => setCsv(csv)} />

      <button
        type="submit"
        className="secondaryBtn w-full mt-5"
        onClick={() => {
          if (csv) mutate(csv);
        }}
        disabled={!csv}
      >
        <BsUpload />
        Upload
      </button>

      {exampleFile ? (
        <button onClick={(e) => e.stopPropagation()} type="button" className="primaryBtn w-full mt-5">
          <a href={exampleFile?.path} download={exampleFile?.name}>
            Download sample
          </a>
        </button>
      ) : null}
    </Modal>
  );
};
