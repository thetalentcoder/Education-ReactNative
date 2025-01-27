import { useQuery } from 'react-query';

import { useAuthStore } from 'store/auth';
import { fetchMe } from 'api/users';
import { AppRouter } from 'routes';

export const App = () => {
  const { isLogged, setIsLogged, setUser } = useAuthStore();
  
  useQuery(['me'], fetchMe, {
    enabled: isLogged,
    onSuccess: (data) => {
      setUser(data);
    },
    onError: (err) => {
      console.error("Error fetching user data:", err);
      setIsLogged(false);
    }
  });
  
  return (
    <main>
      {AppRouter}
    </main>
  );
};
