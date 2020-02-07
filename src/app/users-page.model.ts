import { User } from './user.model';

export interface UsersPage {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
}