import { IRepository, ISearchRequest } from '../../api/ISearch';

export interface ISearchState {
  repositories: IRepository[];
  pagination: ISearchRequest;
  isLoading: boolean;
  totalCount: number;
}
