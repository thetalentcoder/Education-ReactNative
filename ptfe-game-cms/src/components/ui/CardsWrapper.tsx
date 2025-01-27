import { CardSkeleton } from './CardSkeleton';

import { TablePagination } from './TablePagination';
import { Pagination } from '../../types/table';

interface Props {
  data: any[];
  isLoading: boolean;
  skeletonHeight: string;
  children: (item: any, i?: number) => JSX.Element;
  gridTemplateColumns?: string;
  pagination?: Pagination;
}

export const CardsWrapper = ({ data, isLoading, skeletonHeight, children, pagination, gridTemplateColumns }: Props) => {
  return (
    <div className="p-5">
      {isLoading ? (
        <CardSkeleton className={skeletonHeight} />
      ) : data.length ? (
        <div className="cardsWrapper" style={gridTemplateColumns ? { gridTemplateColumns } : {}}>
          {data.map((item, i) => children(item, i))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 mt-10">
          <span className="text-center italic text-2xl">No results found...</span>
        </div>
      )}

      {pagination ? <TablePagination {...pagination} /> : null}
    </div>
  );
};
