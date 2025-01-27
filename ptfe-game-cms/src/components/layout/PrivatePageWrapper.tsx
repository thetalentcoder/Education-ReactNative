import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { AuthPathnames } from 'routes/pathnames';
import { useAuthStore } from 'store/auth';
import { Sidebar } from './sidebar';

interface Props {
  children: React.ReactNode;
}



export const PrivatePageWrapper = ({ children }: Props) => {
  const { user, setUser, setIsLogged, isLogged } = useAuthStore();
  const navigate = useNavigate();
  
  const onSignOut = () => {
    navigate(AuthPathnames.LOGIN);
    setUser(null);
    setIsLogged(false);
    localStorage.clear();
    sessionStorage.clear();
  }

  useEffect(() => {
    if (!isLogged/* || !getStorageItem('token')*/) onSignOut();
  }, [isLogged]);

  return (
    <div className="w-full h-auto lg:h-screen bg-bg flex items-start">
      <Sidebar />
      <div className="flex-1 overflow-y-auto w-full h-full mt-20 lg:mt-0 custom-scrollbar">
        {children}
      </div>
    </div>
  );
};
