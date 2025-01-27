import { Filters } from './global';

export type Pagination = {
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  filters: Filters;
  totalCount: number;
};

export type TableProps = {
  data: any[];
  isLoading: boolean;
  columns: TableColumn[];
  className?: string;
  sort?: SortProps;
  pagination?: Pagination;
  isPrint?: boolean;
  draggable?: {
    onDragEnd: (result: any) => void;
  }|null;
};

export type TableColumn = {
  key: string;
  name: string;
  cell: (item: any, i: number, provided?: any) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  sort?: string[];
};

export type SortProps = {
  sortQuery: { key: string[]; order: Direction };
  setSortQuery: React.Dispatch<React.SetStateAction<{ key: string[]; order: Direction }>>;
};

export type Direction = 'asc' | 'desc';
