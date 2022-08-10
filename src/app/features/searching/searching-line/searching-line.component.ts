import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { searchQueryChanged } from '../../../store/search/search.actions';
import { selectSearchQuery } from '../../../store/search/search.selectors';

@Component({
  selector: 'app-searching-line',
  templateUrl: './searching-line.component.html',
  styleUrls: ['./searching-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchingLineComponent implements OnInit {
  query = '';

  private masterSub = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.masterSub.add(
      this.store
        .select(selectSearchQuery)
        .subscribe((x) => (this.query = x ?? ''))
    );
  }

  setValue(query: any) {
    this.store.dispatch(searchQueryChanged({ query }));
  }
}
