import { Pipe, PipeTransform } from '@angular/core';
import { FetchService } from '../app/api/fetch.service';
import { Observable, startWith, tap } from 'rxjs';

@Pipe({
  name: 'fetch',
})
export class FetchPipe implements PipeTransform {
  constructor(private fetchService: FetchService) {}

  // ugly but ok
  transform(value: string): Observable<Record<string, any>> {
    return this.fetchService
      .get(value)
      .pipe(startWith('...loading'), tap(console.log));
  }
}
