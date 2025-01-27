import { useMemo, useState } from 'react';
import { BiCog, BiLogOut } from 'react-icons/bi';
import { FiChevronRight } from 'react-icons/fi';
import { VscTypeHierarchySub } from 'react-icons/vsc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { USER_ADMIN } from 'api/users/types';
import { reactQueryConfig } from 'lib/react-query';
import { Pathnames } from 'routes/pathnames';
import { useAuthStore } from 'store/auth';
import { isActiveClass } from 'utils';
import { ADMIN_MENU } from 'utils/menu-data';

interface Props {
  isExpand: boolean;
}

export const MenuSidebar = ({ isExpand }: Props) => {
  const [activeSubmenu, setActiveSubmenu] = useState('');

  const { user, setIsLogged, setUser } = useAuthStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const menu = useMemo(() => {
    switch (user?.role) {
      case USER_ADMIN:
        return ADMIN_MENU;
      default:
        return [];
    }
  }, [user])

  const onSignOut = () => {
    navigate(Pathnames.LOGIN);
    setUser(null);
    setIsLogged(false);
    localStorage.clear();
    sessionStorage.clear();
    reactQueryConfig.clear();
    toast.success('You have been logged out successfully');
  };

  return (
    <nav className="flex flex-col gap-1 w-full">
      {menu.map((item: any) => {
        const isActiveLink = pathname === item.path || item?.submenu?.some((temp: any) => temp.path === pathname);

        return (
          <div key={item.title}>
            <Link
              to={item.path || ''}
              className={`w-full flex items-center justify-between ${isExpand ? 'pr-5' : 'pr-0'}`}
              onClick={() => {
                if (item.submenu?.length) setActiveSubmenu((p) => (p === item.title ? '' : item.title));
                else setActiveSubmenu('');
              }}
            >
              <div className={`flex items-center gap-4 ${isExpand ? 'w-fit' : 'w-full'}`}>
                <span
                  className={`mx-auto flex items-center justify-center text-xl ${
                    isExpand ? 'w-14 h-14 rounded-none rounded-r-full' : 'w-12 h-12 rounded-full'
                  } ${isActiveLink ? 'text-white bg-danger' : 'bg-white text-tertiary'}
                  `}
                >
                  {item.icon}
                </span>
                {isExpand && (
                  <span
                    className={`text-sm leading-sm ${isActiveLink ? 'font-semibold text-primary' : 'text-tertiary'}`}
                  >
                    {item.title}
                  </span>
                )}
              </div>
              {isExpand && <FiChevronRight />}
            </Link>
            {item.submenu?.length && activeSubmenu === item.title ? (
              <div className={`relative flex flex-col ${isExpand ? 'pl-[45px]' : 'pl-[32px]'}`}>
                {item.submenu.map((subItem: any) => {
                  const isActiveLink = pathname === subItem.path;

                  return (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className={`p-3 w-fit ${isActiveClass(isActiveLink, 'active')}`}
                    >
                      <span
                        className={`flex items-center gap-3 text-sm leading-sm ${
                          pathname === subItem.path ? 'font-semibold text-primary ' : 'text-tertiary'
                        }`}
                      >
                        <VscTypeHierarchySub className="w-4 h-4" />
                        {isExpand && subItem.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>
        );
      })}

      <Link
        to={Pathnames.ACCOUNT_SETTINGS}
        className={`w-full flex items-center justify-between ${isExpand ? 'pr-5' : 'pr-0'}`}
      >
        <div className={`flex items-center gap-4 ${isExpand ? 'w-fit' : 'w-full'}`}>
          <span
            className={`mx-auto flex items-center justify-center text-xl bg-white text-tertiary ${
              isExpand ? 'w-14 h-14 rounded-none rounded-r-full' : 'w-12 h-12 rounded-full'
            }`}
          >
            <BiCog />
          </span>
          {isExpand && <span className="text-sm leading-sm text-tertiary">Account Settings</span>}
        </div>
        {isExpand && <FiChevronRight />}
      </Link>
      <div
        className={`w-full flex items-center justify-between cursor-pointer ${isExpand ? 'pr-5' : 'pr-0'}`}
        onClick={onSignOut}
      >
        <div className={`flex items-center gap-4 ${isExpand ? 'w-fit' : 'w-full'}`}>
          <span
            className={`mx-auto flex items-center justify-center text-xl bg-white text-tertiary ${
              isExpand ? 'w-14 h-14 rounded-none rounded-r-full' : 'w-12 h-12 rounded-full'
            }`}
          >
            <BiLogOut />
          </span>
          {isExpand && <span className="text-sm leading-sm text-tertiary">Sign Out</span>}
        </div>
        {isExpand && <FiChevronRight />}
      </div>
    </nav>
  );
};
