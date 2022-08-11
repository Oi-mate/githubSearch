import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IRepository } from '../../../../api/ISearch';

@Component({
  selector: 'app-search-results-row',
  templateUrl: './search-results-row.component.html',
  styleUrls: ['./search-results-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsRowComponent {
  @Input() data!: IRepository;

  constructor() {}
}
