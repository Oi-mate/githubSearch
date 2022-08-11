import { Component, Input } from '@angular/core';
import { IRepository } from '../../../../api/ISearch';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.scss'],
})
export class OwnerDetailsComponent {
  @Input() repo!: IRepository;
}
