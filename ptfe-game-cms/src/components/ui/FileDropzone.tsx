import { useState } from 'react';

interface Props {
  defaultFileName?: string;
  onDrop: (file: File) => void;
}

export const FileDropzone = ({ defaultFileName, onDrop }: Props) => {
  const [fileName, setFileName] = useState<string | undefined>(defaultFileName);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) return alert('File size should be less than 5MB');

    setFileName(file.name);
    onDrop(file);
  };

  return (
    <div className="w-full relative cursor-pointer overflow-hidden">
      <input
        type="file"
        className="text-[0] border-0 absolute inset-0 cursor-pointer opacity-0 z-[5]"
        title=""
        onChange={onChange}
        accept="*/*"
        multiple={false}
      />
      {fileName ? (
        <div className="text-sm text-center text-dark">
          <p>Uploaded File:</p>
          <p>{fileName}</p>
        </div>
      ) : (
        <span className="text-sm text-center text-dark">Drag and drop, or click to select</span>
      )}
    </div>
  );
};
