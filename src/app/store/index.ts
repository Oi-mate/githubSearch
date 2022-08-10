import { searchReducer } from './search/search.reducer';
import { SearchEffects } from './search/search.effects';
import { ISearchState } from './search/ISearchState';

export interface IAppState {
  search: ISearchState;
}

export const appReducers = {
  search: searchReducer,
};

export const appEffects = [SearchEffects];
