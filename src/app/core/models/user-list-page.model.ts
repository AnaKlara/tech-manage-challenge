import { User } from "./user.model";

export interface UserListPage {
    first: number;
    prev: number | null;
    next: number | null;
    last: number;
    pages: number;
    items: number;
    data: User[];
}