import { createAction, props } from '@ngrx/store';
import {
  IPaginationSettings,
  ISearchRequest,
  ISearchResponse,
} from '../../api/ISearch';

const SEARCH_UI_ACTION_LABEL = '[Search UI]';
const SEARCH_API_ACTION_LABEL = '[Search API]';
const STORE_ACTION_LABEL = '[Store]';

export const refreshSearchResults = createAction(
  `${SEARCH_UI_ACTION_LABEL} refresh search results`
);

export const searchQueryChanged = createAction(
  `${SEARCH_UI_ACTION_LABEL} search query changed`,
  props<{ query: string }>()
);

export const filterChanged = createAction(
  `${SEARCH_UI_ACTION_LABEL} filter changed`,
  props<Partial<IPaginationSettings>>()
);

export const reachedScrollThreshold = createAction(
  `${SEARCH_UI_ACTION_LABEL} reached scroll threshold`
);

export const searchListFetched = createAction(
  `${SEARCH_API_ACTION_LABEL} list fetched`,
  props<{ res: ISearchResponse }>()
);

export const requestChanged = createAction(
  `${STORE_ACTION_LABEL} pagination changed`,
  props<Partial<ISearchRequest>>()
);
