import { BsCheck } from 'react-icons/bs';

interface Props {
  isChecked: boolean;
  onToggle: () => void;
}

export const Checkbox = ({ isChecked, onToggle }: Props) => {
  return (
    <div
      className={`relative cursor-pointer rounded-lg flex items-center justify-center ${
        isChecked ? 'bg-success-200 border border-bg-success-200' : 'bg-secondary border border-stone-300'
      }`}
      onClick={onToggle}
    >
      <BsCheck className={`text-white w-5 h-5 ${isChecked ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};
