import { Component, Input } from '@angular/core';
import { IRepository } from '../../../../api/ISearch';

@Component({
  selector: 'app-repo-details-dumb',
  templateUrl: './repo-details-dumb.component.html',
  styleUrls: ['./repo-details-dumb.component.scss'],
})
export class RepoDetailsDumbComponent {
  @Input() repo!: IRepository;
}
