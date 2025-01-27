import ReactSelect from 'react-select';
import reactSelectStylesConfig from '../../lib/react-select';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { Pagination } from '../../types/table';

export const TablePagination = ({ setFilters, filters, totalCount }: Pagination) => {
  const onPageChange = (num: number) => setFilters((p) => ({ ...p, page: (p.page || 0) + num }));
  const limit = Number(filters.limit);
  const totalPages = Math.ceil(totalCount / limit);
  return (
    <div className="flex items-center justify-end p-6">
      <div className="flex items-center gap-6">
        <ReactSelect
          styles={reactSelectStylesConfig}
          menuPlacement="top"
          value={{ label: filters.limit, value: filters.limit }}
          options={selectOptions.map((val) => ({ label: val, value: val }))}
          onChange={({ value }: any) => setFilters((p) => ({ ...p, page: 1, limit: value }))}
        />

        <div className="flex items-center gap-3">
          <BsFillArrowLeftCircleFill
            onClick={() => {
              if ((filters?.page || 1) > 1) onPageChange(-1);
            }}
            style={{
              width: 24,
              height: 24,
              cursor: 'pointer',
              color: (filters?.page || 1) === 1 ? '#cccccc' : '#87C6E8',
            }}
          />
          <input
            type="text"
            className="bg-secondary rounded-full p-3 text-sm text-center leading-sm w-16"
            value={filters.page}
            onChange={(e) => {
              let num = parseInt(e.target.value) || 0;
              num = num > totalPages ? totalPages : num;
              setFilters((p) => ({ ...p, page: num }));
            }}
          />
          of {totalPages}
          <BsFillArrowRightCircleFill
            onClick={() => {
              if ((filters?.page || 1) < totalPages) onPageChange(1);
            }}
            style={{
              width: 24,
              height: 24,
              cursor: 'pointer',
              color: (filters?.page || 1) >= totalPages ? '#cccccc' : '#87C6E8',
            }}
          />
        </div>
      </div>
    </div>
  );
};

const selectOptions = [10, 25, 50, 100];
