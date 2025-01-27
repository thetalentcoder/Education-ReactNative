import { BsCheck } from 'react-icons/bs';

interface Props {
  isChecked: boolean;
  onToggle?: () => void;
}

export const RadioInput = ({ isChecked, onToggle }: Props) => {
  return (
    <div
      className={`relative cursor-pointer rounded-full w-6 h-6 flex items-center justify-center ${
        isChecked ? 'bg-primary' : 'bg-secondary'
      }`}
      onClick={onToggle}
    >
      <div className="checkbox">
        <BsCheck className={`text-white w-5 h-5 ${isChecked ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </div>
  );
};
