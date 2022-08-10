export interface ISearchRequest extends IPaginationSettings {
  q?: string;
}

export interface IPaginationSettings {
  sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated';
  order?: 'desc' | 'asc';
  per_page?: number;
  page?: number;
}

export interface ISearchResponse {
  total_count: 40;
  incomplete_results: boolean;
  items: ISearchResponseItems;
}

export interface ISearchResponseItems extends Array<IRepository> {}

export interface IRepository {
  id: number;
  name: string;
  owner: {
    login: string;
    id: number;
  };
  language: string;
}
