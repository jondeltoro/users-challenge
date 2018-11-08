import { UserModel } from './user.model';

export interface UserListModel {
  data: UserModel[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}
