import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
