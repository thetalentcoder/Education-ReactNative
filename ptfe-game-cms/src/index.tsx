import ReactDOM from 'react-dom/client';
import { QueryClientProvider } from 'react-query';

import { ReactToastifyConfig } from 'lib/react-toastify';
import { reactQueryConfig } from 'lib/react-query';
import { App } from 'App';
import 'styles/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <QueryClientProvider client={reactQueryConfig}>
    <App />
    <ReactToastifyConfig />
  </QueryClientProvider>
);
