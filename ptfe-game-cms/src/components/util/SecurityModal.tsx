import { Modal } from '../ui/Modal';

interface Props {
  close: () => void;
  onClick: () => void;
  text: string;
  btnText: string;
  className?: string;
}

export const SecurityModal = ({ close, onClick, text, btnText, className }: Props) => {
  return (
    <Modal title="Are you sure?" onClose={close} boxClassName={className}>
      <p>{text}</p>
      <button type="submit" className="secondaryBtn w-full mt-6" onClick={onClick}>
        {btnText}
      </button>
    </Modal>
  );
};
