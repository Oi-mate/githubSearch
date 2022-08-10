import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISearchRequest, ISearchResponse } from './ISearch';
import { map, Observable } from 'rxjs';

const API_URL = 'https://api.github.com';
const REPO_SEARCH_METHOD = '/search/repositories';

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  search(params?: ISearchRequest): Observable<ISearchResponse> {
    return this.http
      .get(API_URL + REPO_SEARCH_METHOD, {
        params: params as { [key: string]: string | number },
        observe: 'body',
        headers: {
          accept: 'application/vnd.github+json',
        },
      })
      .pipe(map((r) => r as ISearchResponse));
  }
}
