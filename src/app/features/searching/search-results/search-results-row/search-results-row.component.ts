import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IRepository } from '../../../../api/ISearch';

@Component({
  selector: 'app-search-results-row',
  templateUrl: './search-results-row.component.html',
  styleUrls: ['./search-results-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsRowComponent implements OnChanges {
  @Input() data!: IRepository;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.data);
  }
}
