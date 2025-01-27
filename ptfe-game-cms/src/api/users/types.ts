export const USER_ADMIN = 1;
export const USER_STUDENT = 0;

export interface User {
    _id: string;
    email: string;
    fullname: string;
    role: number;
    password: string;
    subscription: string;
}

export interface UsersResponse {
    users: User[];
    count: number;
}
  