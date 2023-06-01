export interface UserForm {
    name: string;
    email: string;
    phone: string;
    position_id: string;
}

export interface User extends Omit<UserForm, "photo"> {
    id: number;
    position: string;
    registration_timestamp: number;
    photo: string;
}

export interface UsersResponse {
    success: boolean;
    total_pages: number;
    total_users: number;
    count: number;
    page: number;
    users: User[];
}

export interface PositionsResponse {
    success: boolean;
    positions: Position[];
}

export interface Position {
    id: number;
    name: string;
}
