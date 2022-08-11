import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { IRepository } from '../../../api/ISearch';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepoDetailsComponent {
  @Input() repo!: IRepository;
  @Output() back: EventEmitter<void> = new EventEmitter<void>();

  backClicked() {
    this.back.emit();
  }
}
