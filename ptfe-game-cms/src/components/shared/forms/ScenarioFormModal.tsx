import { Modal } from 'components/ui/Modal';
import { useFormik } from 'formik';
import { useState } from 'react';
import { TfiSave } from 'react-icons/tfi';
import { useMutation } from 'react-query';
import { createScenarioSchema } from 'utils/yup';

import { getImgUrl, storeScenario, updateScenario } from 'api/scenarios';
import { PostScenarioRequest, Scenario } from 'api/scenarios/types';
import JoditEditor from 'jodit-react';
import { SecurityModal } from '../../util/SecurityModal';


interface Props {
  scenario?: Scenario | null;
  onClose: () => void;
  refetch: () => void;
  selectCreatedScenario?: (q: Scenario) => void;
}

interface FormikState {
  title: string;
  scenario: string;
}

export const ScenarioFormModal = ({ scenario, refetch, onClose, selectCreatedScenario }: Props) => {
  const [isOpenSecurityModal, setIsOpenSecurityModal] = useState(false);
  const { mutate: storeMutate, isLoading: isLoadingStore } = useMutation(storeScenario);
  const { mutate: updateMutate, isLoading: isLoadingUpdate } = useMutation(updateScenario);
  const { mutate: fetchImgUrl } = useMutation(getImgUrl);
  const [imgUrl, setImgUrl] = useState('');
  const isLoading = isLoadingStore || isLoadingUpdate;

  const initialValues: FormikState = {
    title: scenario?.title.trim() || '',
    scenario: scenario?.scenario || ''
  };

  const formik = useFormik({ initialValues, validationSchema: createScenarioSchema, onSubmit: (v) => onSubmit(v) });

  const onSubmit = (state: FormikState) => {
    const body: PostScenarioRequest = {
      ...state,
    };
    const formData = new FormData();
    if (scenario)
    {
        updateMutate({
          ...body,
          id: scenario._id,
        }, { onSuccess });
    }
    else
        storeMutate(body, { onSuccess });
  };

  const onSuccess = (scenario: Scenario) => {
    if (selectCreatedScenario) selectCreatedScenario(scenario);
    refetch();
    onClose();
  };

  return (
    <Modal
      title={scenario ? 'Edit Scenario' : 'Create Scenario'}
      onClose={() => setIsOpenSecurityModal(true)}
      boxClassName="w-[1200px]"
      contentClassName="overflow-y-auto h-[calc(100%-69px)]"
    >
      {isOpenSecurityModal && (
        <SecurityModal
          close={() => setIsOpenSecurityModal(false)}
          text="Are you sure you want to leave?"
          btnText="Leave"
          onClick={onClose}
        />
      )}
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
        <label className="text-xs font-semibold text-label block">Scenario</label>
        <input
          value={formik.values.title}
          placeholder="Enter title..."
          className="border border-gray-300 min-h-100 p-4 rounded-lg resizable"
          onChange={(e) => formik.setFieldValue('title', e.target.value)}
        />

        <div className="flex items-center gap-5">
          <label className="font-semibold">Upload image in order to get url</label>
          <input
            type="file"
            onChange={(e) => {
              const image = e.target?.files?.[0];
              if (!image) return;
              const formData = new FormData();
              formData.append('image', image);
              fetchImgUrl(formData, { onSuccess: (url) => setImgUrl(url) });
            }}
          />
        </div>

        {imgUrl ? <p>Paste this url in the Rich text editor: {imgUrl}</p> : null}

        <JoditEditor
          value={formik.values.scenario}
          onBlur={(val) => formik.setFieldValue('scenario', val)}
        />

        <button type="submit" className="secondaryBtn w-fit" disabled={isLoading}>
          <TfiSave />
          Save Scenario
        </button>
      </form>
    </Modal>
  );
};
