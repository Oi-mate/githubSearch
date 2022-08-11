import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectLoading,
  selectResults,
} from '../../../store/search/search.selectors';
import { tap } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { reachedScrollThreshold } from '../../../store/search/search.actions';
import { IRepository } from '../../../api/ISearch';

const SEARCH_SCROLL_GAP = 15;

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent {
  @Output() showDetailsCalled = new EventEmitter<IRepository>();

  @ViewChild('scroll') scrollRef!: CdkVirtualScrollViewport;

  // not the best solution
  fetchingPage = false;

  dataLength = 0;
  loading = this.store.select(selectLoading);
  repos = this.store.select(selectResults).pipe(
    tap((x) => {
      this.dataLength = x.length;
      this.fetchingPage = false;
    })
  );
  constructor(private store: Store) {}

  scrolledIndexChange() {
    if (
      !this.fetchingPage &&
      this.scrollRef.getRenderedRange().end >=
        this.dataLength - SEARCH_SCROLL_GAP
    ) {
      this.store.dispatch(reachedScrollThreshold());
      this.fetchingPage = true;
    }
  }

  showDetails(repo: IRepository) {
    this.showDetailsCalled.emit(repo);
  }
}
