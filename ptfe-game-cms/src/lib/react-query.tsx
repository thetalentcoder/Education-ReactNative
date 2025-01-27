import { QueryClient } from 'react-query';

export const reactQueryConfig = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false
    }
  }
});
