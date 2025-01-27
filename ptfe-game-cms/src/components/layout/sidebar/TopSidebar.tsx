import { RiExpandLeftFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import LogoImg from 'assets/images/Logo.png';
import { Pathnames } from 'routes/pathnames';

interface Props {
  isExpand: boolean;
  setIsExpand: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TopSidebar = ({ isExpand, setIsExpand }: Props) => (
  <div className="relative">
    <div className={`w-full flex gap-2 items-center justify-between ${isExpand ? 'flex-row px-5' : 'flex-col px-2'}`}>
      <Link to={Pathnames.DASHBOARD} className="flex w-fit">
        <img src={LogoImg} alt="PTFE" />
      </Link>
    </div>
    <RiExpandLeftFill
      className={`w-5 h-5 absolute cursor-pointer transform ${
        isExpand ? 'left-4 top-20 rotate-0' : 'top-20 left-1/2 transform -translate-x-1/2 rotate-180'
      }`}
      onClick={() => setIsExpand((p) => !p)}
    />
  </div>
);
