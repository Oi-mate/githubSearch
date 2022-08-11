import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISearchState } from './ISearchState';

const searchFeature = createFeatureSelector<ISearchState>('search');

export const selectPagination = createSelector(
  searchFeature,
  ({ pagination }) => pagination
);

export const selectSearchQuery = createSelector(selectPagination, ({ q }) => q);

export const selectResults = createSelector(
  searchFeature,
  ({ repositories }) => repositories
);

export const selectLoading = createSelector(
  searchFeature,
  ({ isLoading }) => isLoading
);

export const selectPage = createSelector(selectPagination, ({ page }) => page);

export const selectSortType = createSelector(
  selectPagination,
  ({ sort }) => sort
);
export const selectOrder = createSelector(
  selectPagination,
  ({ order }) => order
);

export const selectCount = createSelector(
  searchFeature,
  ({totalCount}) => totalCount
)
