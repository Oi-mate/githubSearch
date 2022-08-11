import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IRepository } from '../../../api/ISearch';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectSearchQuery } from '../../../store/search/search.selectors';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentContainerComponent implements OnInit, OnDestroy {
  repo?: IRepository;

  masterSub = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.masterSub.add(
      this.store
        .select(selectSearchQuery)
        .subscribe(() => (this.repo = undefined))
    );
  }

  ngOnDestroy() {
    this.masterSub.unsubscribe();
  }

  showDetails(repo: IRepository) {
    this.repo = repo;
  }
}
