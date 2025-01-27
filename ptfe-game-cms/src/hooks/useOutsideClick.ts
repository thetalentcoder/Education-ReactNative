import { useEffect, useRef } from 'react';

export const useOutsideClick = (callback: () => void) => {
  const ref: React.MutableRefObject<any> = useRef(null);

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });

  return { ref };
};
