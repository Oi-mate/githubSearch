import { SearchService } from '../../api/search.service';
import { Injectable, Injector } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  filterChanged,
  reachedScrollThreshold,
  refreshSearchResults,
  requestChanged,
  searchListFetched,
  searchQueryChanged,
} from './search.actions';
import {
  catchError,
  debounceTime,
  EMPTY,
  map,
  mergeMap,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectPagination } from './search.selectors';
import { ISearchRequest } from '../../api/ISearch';

export const DEFAULT_QUERY = 'a';

@Injectable()
export class SearchEffects {
  constructor(
    private injector: Injector,
    private actions: Actions,
    private store: Store,
    private searchService: SearchService
  ) {}

  private search = (params: ISearchRequest, paginate = false) =>
    this.store.pipe(
      select(selectPagination),
      take(1),
      switchMap((pagination) => {
        const searchParams = {
          ...pagination,
          ...params,
          page: paginate
            ? pagination.page && pagination.page + 1
            : pagination.page,
        };
        return this.searchService
          .search(searchParams)
          .pipe(tap(() => this.store.dispatch(requestChanged(searchParams))));
      }),
      map((x) => searchListFetched({ res: x })),
      catchError(() => EMPTY)
    );

  ESearchQueryChanged = createEffect(() =>
    this.actions.pipe(
      ofType(searchQueryChanged),
      debounceTime(500),
      mergeMap(({ query }) => this.search({ q: query, page: 1 }))
    )
  );

  ERefresh = createEffect(() =>
    this.actions.pipe(
      ofType(refreshSearchResults),
      mergeMap(() => this.search({}))
    )
  );

  EFilterChanged = createEffect(() =>
    this.actions.pipe(
      ofType(filterChanged),
      mergeMap((x) => this.search(x))
    )
  );

  EReachedScrollThreshold = createEffect(() =>
    this.actions.pipe(
      ofType(reachedScrollThreshold),
      mergeMap(() => this.search({}, true))
    )
  );
}
