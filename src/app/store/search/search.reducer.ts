import { createReducer, on } from '@ngrx/store';
import { requestChanged, searchListFetched } from './search.actions';
import { ISearchState } from './ISearchState';

export const initialState: ISearchState = {
  repositories: [],
  pagination: {
    q: '',
    per_page: 100,
    page: 1,
    sort: 'forks',
    order: 'desc',
  },
};

export const searchReducer = createReducer(
  initialState,
  on(searchListFetched, (state, { res }) => ({
    ...state,
    repositories: res.items,
  })),
  on(requestChanged, (state, props) => ({ ...state, pagination: props }))
);
