import { Modal } from 'components/ui/Modal';

interface Props {
  title: string;
  onAgree: () => void;
  onDismiss: () => void;
  onClose?: () => void;
  agreeText?: string;
  dismissText?: string;
}

export const ConfirmModal = ({ title, onAgree, onClose, onDismiss, agreeText, dismissText }: Props) => (
  <Modal title="Confirm" onClose={onClose || onDismiss} boxClassName="w-[400px]">
    <div>
      <h2 className="text-center font-medium text-xl">
        Are you sure you want <br /> to {title}?
      </h2>
      <div className="grid grid-cols-2 gap-4 mt-10">
        <button className="secondaryBtn" onClick={onAgree}>
          {agreeText || `Yes, I'm sure`}
        </button>
        <button className="outlinedBtn" onClick={onDismiss}>
          {dismissText || `No, cancel`}
        </button>
      </div>
    </div>
  </Modal>
);
