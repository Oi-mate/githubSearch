import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchingComponent {}
