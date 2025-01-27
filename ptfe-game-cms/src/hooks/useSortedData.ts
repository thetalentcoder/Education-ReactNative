
import { useState, useMemo } from 'react';
import { useQuery } from 'react-query';
import orderBy from 'lodash/orderBy';

import { Direction } from 'types/table';
import { searchByKeys } from 'utils';

export interface SortedDataProps {
  queryKey: string;
  queryFn: () => Promise<any>;
  searchKeys: string[];
}

export const useSortedData = ({ queryKey, queryFn, searchKeys }: SortedDataProps) => {
  const { data, isLoading, refetch } = useQuery([queryKey], queryFn);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortQuery, setSortQuery] = useState<{ key: string[]; order: Direction }>({ key: [''], order: 'asc' });
  const searchedData = useMemo(() => {
    const res = searchByKeys(searchKeys, data || [], searchQuery);

    return orderBy(res, sortQuery.key, sortQuery.order);
  }, [searchQuery, data, searchKeys, sortQuery]);

  return {
    search: { searchQuery, setSearchQuery },
    data: data || [],
    searchedData,
    isLoading,
    refetch,
    sort: { sortQuery, setSortQuery }
  };
};
