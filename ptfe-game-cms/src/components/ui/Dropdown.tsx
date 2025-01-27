import { useState } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';

import { useOutsideClick } from 'hooks/useOutsideClick';

interface Props {
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Dropdown = ({ options, onChange, value, placeholder = 'Show All' }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const { ref } = useOutsideClick(() => isOpen && setIsOpen(false));

  return (
    <div className="relative" ref={ref}>
      <div
        className="flex items-center justify-center gap-3 py-3 px-6 cursor-pointer shadow-card rounded-xl hover:shadow-md transition"
        onClick={() => setIsOpen((p) => !p)}
      >
        <span className="text-sm font-medium capitalize">{value || placeholder}</span>
        <AiOutlineCaretDown className="text-[#C4C4C4] w-4 h-4" />
      </div>
      {isOpen && (
        <div className="absolute top-[calc(100%+10px)] right-0 w-[150px] shadow-md rounded-xl bg-white z-10 overflow-hidden">
          <ul>
            {options.map((o) => (
              <li
                key={o.value}
                className="p-2 text-sm transition cursor-pointer bg-white hover:bg-bg"
                onClick={() => {
                  onChange(o.value);
                  setIsOpen(false);
                }}
              >
                {o.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
