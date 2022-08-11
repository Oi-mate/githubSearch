export interface ISearchRequest extends IPaginationSettings {
  q?: string;
}

export const SORTS = [
  'stars',
  'forks',
  'help-wanted-issues',
  'updated',
] as const;
export const ORDERS = ['desc', 'asc'] as const;
export type TOrders = typeof ORDERS[number];
export type TSorts = typeof SORTS[number];
export interface IPaginationSettings {
  sort?: typeof SORTS[number];
  order?: typeof ORDERS[number];
  per_page?: number;
  page?: number;
}

export interface ISearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: ISearchResponseItems;
}

export interface ISearchResponseItems extends Array<IRepository> {}

export interface IRepository {
  id: number;
  name: string;
  contributors_url: string;
  owner: {
    login: string;
    id: number;
    avatar_url: number;
  };
  language: string;
  languages_url: string;
  forks_count: number;
}
