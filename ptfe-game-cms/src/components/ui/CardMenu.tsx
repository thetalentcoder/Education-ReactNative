import { HiDotsVertical } from 'react-icons/hi';

import { useOutsideClick } from 'hooks/useOutsideClick';

interface Props {
  item: any;
  activeOption: string;
  setActiveOption: React.Dispatch<React.SetStateAction<string>>;
  options: { text: string; onClick: (item: any) => void; visible?: boolean }[];
}

export const CardMenu = ({ item, options, activeOption, setActiveOption }: Props) => {
  const id = item._id;

  const { ref } = useOutsideClick(() => {
    if (activeOption === id) setActiveOption('');
  });

  return (
    <div ref={ref}>
      <HiDotsVertical
        className="absolute top-3 right-3 text-md text-secondary cursor-pointer"
        onClick={() => setActiveOption((p) => (p === id ? '' : id))}
      />
      {activeOption === id && (
        <ul className="optionsList !top-10">
          {options
            .filter((o) => o.visible !== false)
            ?.map((option) => (
              <li
                key={option.text}
                onClick={() => {
                  option.onClick(item);
                  setActiveOption('');
                }}
              >
                {option.text}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};
