import { SearchService } from '../../api/search.service';
import { Injectable, Injector } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  filterChanged,
  loadingStateChanged,
  reachedScrollThreshold,
  refreshSearchResults,
  requestChanged,
  searchListFetched,
  searchListPaginated,
  searchQueryChanged,
} from './search.actions';
import {
  catchError,
  debounceTime,
  EMPTY,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectPagination } from './search.selectors';
import { ISearchRequest, ISearchResponseItems } from '../../api/ISearch';

export const DEFAULT_QUERY = 'a';

@Injectable()
export class SearchEffects {
  fetchingPage?: number;

  constructor(
    private injector: Injector,
    private actions: Actions,
    private store: Store,
    private searchService: SearchService
  ) {}

  // TODO: overloaded, refactor
  private search = (params: ISearchRequest, paginate = false) =>
    this.store.pipe(
      select(selectPagination),
      take(1),
      tap(() => this.store.dispatch(loadingStateChanged({ isLoading: true }))),
      map((pagination) => ({
        ...pagination,
        ...params,
        page: paginate
          ? pagination.page && pagination.page + 1
          : pagination.page,
      })),
      switchMap((searchParams) => {
        return searchParams.q
          ? this.searchService
              .search(searchParams)
              .pipe(
                tap(() => this.store.dispatch(requestChanged(searchParams)))
              )
          : of({
              total_count: 0,
              incomplete_results: false,
              items: [] as ISearchResponseItems,
            });
      }),
      tap(() => this.store.dispatch(loadingStateChanged({ isLoading: false }))),
      map((x) =>
        paginate
          ? searchListPaginated({ res: x })
          : searchListFetched({ res: x })
      ),
      catchError(() => {
        this.store.dispatch(loadingStateChanged({ isLoading: false }));
        return EMPTY;
      })
    );

  // TODO: can be buggy, make search action prioritized over pagination action
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
      mergeMap(() => this.search({ q: '' }))
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
      debounceTime(500),
      mergeMap(() => this.search({}, true))
    )
  );
}
