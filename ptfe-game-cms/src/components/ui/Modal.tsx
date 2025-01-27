import { createPortal } from 'react-dom';
import { IoMdArrowRoundBack } from 'react-icons/io';

interface Props {
  title: string;
  onClose?: () => void;
  children: React.ReactNode;
  wrapperClassName?: string;
  boxClassName?: string;
  contentClassName?: string;
  hasBackButton?: boolean;
}

export const Modal = ({
  title,
  onClose,
  children,
  wrapperClassName = '',
  boxClassName = '',
  contentClassName = '',
  hasBackButton = true
}: Props) => (
  <>
    {createPortal(
      <div
        className={`fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4 ${wrapperClassName}`}
        onClick={onClose}
      >
        <div
          className={`bg-white rounded-xl max-h-[90vh] flex flex-col ${boxClassName}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-b border-secondary p-5 flex items-center gap-4">
            {hasBackButton && <IoMdArrowRoundBack className="text-2xl cursor-pointer" onClick={onClose} />}
            <h3 className="text-xl font-semibold">{title}</h3>
          </div>
          <div className={`p-5 ${contentClassName}`}>{children}</div>
        </div>
      </div>,
      document.body
    )}
  </>
);
