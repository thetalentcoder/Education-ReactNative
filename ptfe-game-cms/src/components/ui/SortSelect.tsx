import ReactSelect from 'react-select';

import reactSelectStylesConfig from 'lib/react-select';

const options = [
  { label: 'Name (A-Z)', value: 'name', sortOrder: 1 },
  { label: 'Name (Z-A)', value: 'name', sortOrder: -1 },
  { label: 'Newest First', value: 'createdAt', sortOrder: -1 },
  { label: 'Oldest First', value: 'createdAt', sortOrder: 1 }
];

interface Props {
  sortBy?: string;
  sortOrder?: number;
  onChange: (sortBy: string, sortOrder: number) => void;
}

export const SortSelect = ({ sortBy, sortOrder, onChange }: Props) => (
  <div className="w-[160px]">
    <ReactSelect
      styles={reactSelectStylesConfig}
      options={options}
      placeholder="Sory by"
      value={options.find((o) => o.value === sortBy && o.sortOrder === sortOrder)}
      onChange={(val: any) => onChange(val.value, val.sortOrder)}
    />
  </div>
);
