import { createReducer, on } from '@ngrx/store';
import {
  loadingStateChanged,
  requestChanged,
  searchListFetched,
  searchListPaginated,
} from './search.actions';
import { ISearchState } from './ISearchState';
import { ORDERS, SORTS } from '../../api/ISearch';

export const initialState: ISearchState = {
  repositories: [],
  pagination: {
    q: '',
    per_page: 100,
    page: 1,
    sort: SORTS[1],
    order: ORDERS[0],
  },
  isLoading: false,
  totalCount: 0,
};

export const searchReducer = createReducer(
  initialState,
  on(searchListFetched, (state, { res }) => ({
    ...state,
    repositories: res.items,
    totalCount: res.total_count,
  })),
  on(searchListPaginated, (state, { res }) => ({
    ...state,
    repositories: [...state.repositories, ...res.items],
    totalCount: res.total_count,
  })),
  on(requestChanged, (state, props) => ({ ...state, pagination: props })),
  on(loadingStateChanged, (state, { isLoading }) => ({ ...state, isLoading }))
);
