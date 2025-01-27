interface Props {
  label?: string;
  isEnable: boolean;
  onToggle: () => void;
  isColumn?: boolean;
  legend?: boolean;
  inRow?: boolean;
}

export const Switch = ({ inRow, label, isEnable, onToggle, isColumn, legend = true }: Props) => (
  <div className={inRow ? 'flex items-center gap-3' : ''}>
    {label && <label className={`fieldLabel ${inRow ? '!mb-0' : ''}`}>{label}</label>}
    <div className={`flex items-center gap-2 ${isColumn ? 'flex-col' : ''}`}>
      <div
        className={`w-9 h-5 rounded-full cursor-pointer relative px-0.5 flex items-center ${
          isEnable ? 'bg-danger' : 'bg-secondary'
        }`}
        onClick={onToggle}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white transform transition-all duration-300 ease-in-out ${
            isEnable ? 'translate-x-full' : 'translate-x-0'
          }`}
        />
      </div>

      {legend && <p className="text-sm">{isEnable ? 'Active' : 'Inactive'}</p>}
    </div>
  </div>
);
