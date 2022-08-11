import { Pipe, PipeTransform } from '@angular/core';
import { FetchService } from '../app/api/fetch.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'fetch',
})
export class FetchPipe implements PipeTransform {
  constructor(private fetchService: FetchService) {}

  // ugly but ok
  transform(value: string): Observable<Record<string, any>> {
    return this.fetchService
      .get(value);
  }
}
