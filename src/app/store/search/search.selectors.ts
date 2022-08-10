import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISearchRequest } from '../../api/ISearch';
import { ISearchState } from './ISearchState';

const searchFeature = createFeatureSelector<ISearchState>('search');

export const selectPagination = createSelector(
  searchFeature,
  (state: ISearchState) => state.pagination
);

export const selectSearchQuery = createSelector(
  selectPagination,
  (pag: ISearchRequest) => pag.q
);

export const selectResults = createSelector(
  searchFeature,
  (state: ISearchState) => state.repositories
);
