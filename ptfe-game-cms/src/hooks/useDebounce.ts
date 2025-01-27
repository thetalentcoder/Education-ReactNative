import { useState } from 'react';

const useDebounce = (delayTime?: number) => {
  const [delay, setDelay] = useState<any>(null);

  const debounce = (callback: (...arg: any) => any) => {
    if (delay) clearTimeout(delay);
    setDelay(setTimeout(callback, delayTime || 500));
  };

  return { debounce };
};

export default useDebounce;
