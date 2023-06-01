import { PositionsResponse, User, UserForm, UsersResponse } from '../../types';

class AbzService {
    readonly url = "https://frontend-test-assignment-api.abz.agency/api/v1";

    async getUsers(page = 1): Promise<UsersResponse | null> {
        const count = 6;
        const api = `${this.url}/users?count=${count}&page=${page}`;

        try {
            const response = await fetch(api);

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return await response.json();
        } catch (error) {
            const err = error as Error;
            console.log(err)
            return null;
        }
    }

    async getUserById(userId: number): Promise<{ user: User, success: boolean } | null> {
        const api = `${this.url}/users/${userId}`;

        try {
            const response = await fetch(api);

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return await response.json();
        } catch (error) {
            const err = error as Error;
            console.log(err)
            return null;
        }
    }

    async getToken(): Promise<{ token: string, success: boolean } | null> {
        const api = `${this.url}/token`;
        try {
            const response = await fetch(api);

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return await response.json();
        } catch (error) {
            const err = error as Error;
            console.log(err)
            return null;
        }
    }

    async sendForm(form: UserForm): Promise<{ user_id: number, message: string, success: boolean } | null> {
        const api = `${this.url}/users`;

        try {
            const data = await this.getToken();

            if (!data) {
                throw new Error("Receive token error")
            }

            const body = new FormData();

            Object.entries(form).forEach(([key, value]) => {
                body.append(key, value);
            })

            const response = await fetch(api, {
                method: "POST",
                body,
                headers: {
                    'Token': data.token
                }
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return await response.json();
        } catch (error) {
            const err = error as Error;
            console.log(err)
            return null;
        }

    }

    async getPositions(): Promise<PositionsResponse | null> {
        const api = `${this.url}/positions`;
        try {
            const response = await fetch(api);

            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return await response.json();
        } catch (error) {
            const err = error as Error;
            console.log(err)
            return null;
        }
    }
}


export const abzService = new AbzService();