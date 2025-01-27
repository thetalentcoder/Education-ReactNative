import { USER_ADMIN } from 'api/users/types';
import { BiLinkExternal } from 'react-icons/bi';
import { useAuthStore } from 'store/auth';

interface Props {
  isExpand: boolean;
}

export const BottomSidebar = ({ isExpand }: Props) => {
  const { user } = useAuthStore();

  return (
    <div className="mt-auto w-full flex flex-col gap-2 px-5">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-danger text-white flex items-center justify-center font-bold text-sm leading-[100%]">
          {user?.fullname?.[0].toUpperCase()}
        </div>
        {isExpand && <p className="text-base font-medium">{user && user.fullname}</p>}
      </div>
    </div>
  );
};
