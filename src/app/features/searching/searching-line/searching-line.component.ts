import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import {
  filterChanged,
  searchQueryChanged,
} from '../../../store/search/search.actions';
import {
  selectLoading,
  selectOrder,
  selectSearchQuery,
  selectSortType,
} from '../../../store/search/search.selectors';
import { ORDERS, SORTS, TOrders, TSorts } from '../../../api/ISearch';

@Component({
  selector: 'app-searching-line',
  templateUrl: './searching-line.component.html',
  styleUrls: ['./searching-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchingLineComponent implements OnInit, OnDestroy {
  private masterSub = new Subscription();
  loading = this.store.select(selectLoading);
  private currentOrder?: TOrders;
  order = this.store
    .select(selectOrder)
    .pipe(tap((o) => (this.currentOrder = o)));
  sort = this.store.select(selectSortType);

  query = '';
  sortTypes = SORTS;
  orderTypes = ORDERS;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.masterSub.add(
      this.store
        .select(selectSearchQuery)
        .subscribe((x) => (this.query = x ?? ''))
    );
  }

  ngOnDestroy() {
    this.masterSub.unsubscribe();
  }

  setValue(query: any) {
    this.store.dispatch(searchQueryChanged({ query }));
  }

  sortChanged(sort: TSorts) {
    this.store.dispatch(filterChanged({ sort }));
  }

  toggleOrder() {
    this.store.dispatch(
      filterChanged({ order: this.currentOrder === 'asc' ? 'desc' : 'asc' })
    );
  }
}
