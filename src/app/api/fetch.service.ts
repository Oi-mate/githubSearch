import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FetchService {
  constructor(private http: HttpClient) {}

  get(url: string): Observable<Record<string, unknown>> {
    return this.http.get(url) as Observable<Record<string, unknown>>;
  }
}
