import { HiDotsVertical } from 'react-icons/hi';

import { useOutsideClick } from 'hooks/useOutsideClick';

interface Props {
  itemID: any;
  activeMenu: string;
  setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
  children: React.ReactNode;
}

export const TableActions = ({ itemID, activeMenu, setActiveMenu, children }: Props) => {
  const { ref } = useOutsideClick(() => {
    if (activeMenu === itemID) setActiveMenu('');
  });

  return (
    <div className="relative" ref={ref}>
      <HiDotsVertical className="dotsIcon" onClick={() => setActiveMenu((p) => (p === itemID ? '' : itemID))} />
      {itemID === activeMenu && <ul className="optionsList">{children}</ul>}
    </div>
  );
};
