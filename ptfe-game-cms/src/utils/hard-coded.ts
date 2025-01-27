import { Filters } from 'types/global';

export const initialFilterState: Filters = {
  limit: 10,
  page: 1,
  search: '',
  sortBy: 'name',
  sortOrder: 1
};
