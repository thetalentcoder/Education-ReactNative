import { ToastContainer } from 'react-toastify';

export const ReactToastifyConfig = () => (
  <ToastContainer
    position="bottom-center"
    theme="light"
    autoClose={3000}
    closeOnClick
    className="custom-toast-container"
    closeButton={false}
    limit={5}
    style={{ zIndex: 999999999999999 }}
  />
);
