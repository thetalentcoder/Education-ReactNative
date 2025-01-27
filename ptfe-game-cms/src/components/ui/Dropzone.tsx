import { useRef, useState } from 'react';
import { BiTrash } from 'react-icons/bi';

interface Props {
  defaultImg?: File | string;
  onDrop: (file: File) => void;
  onDelete: () => void;
}

export const Dropzone = ({ defaultImg, onDrop, onDelete }: Props) => {
  const [preview, setPreview] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // if size is greater than 5MB
    if (file.size > 5 * 1024 * 1024) return alert('File size should be less than 5MB');

    // if file type is not image
    if (!file.type.includes('image')) return alert('Only images are allowed');

    setPreview(URL.createObjectURL(file));
    onDrop(file);
  };

  return (
    <div className="w-full md:w-[250px] h-[300px] border-2 border-tertiary border-dashed rounded-xl flex items-center justify-center relative cursor-pointer overflow-hidden">
      <input
        type="file"
        className="text-[0] border-0 absolute inset-0 cursor-pointer opacity-0 z-[5]"
        title=""
        onChange={onChange}
        accept="image/*"
        multiple={false}
        ref={ref}
      />
      {preview || defaultImg ? (
        <div
          className="absolute inset-0 !bg-cover !bg-no-repeat !bg-center flex items-center justify-center"
          style={{ backgroundImage: `url(${preview || defaultImg})` }}
        >
          <span
            className="w-10 h-10 flex items-center justify-center bg-white rounded-full z-10"
            onClick={() => {
              setPreview('');
              onDelete();
              if (ref.current) ref.current.value = '';
            }}
          >
            <BiTrash className="w-5 h-5 text-danger" />
          </span>
        </div>
      ) : (
        <span className="text-sm text-center text-dark">Drag and drop, or click to select</span>
      )}
    </div>
  );
};
