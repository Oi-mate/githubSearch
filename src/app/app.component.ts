import { ChangeDetectionStrategy, Component } from '@angular/core';
import { selectLoading } from './store/search/search.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isLoading = this.store.select(selectLoading);

  constructor(private store: Store) {}
}
