import { AxiosResponse } from 'axios';
import agent from '../base';
import {Login, LoginResponse, Register, RegisterResponse} from "./types";
class AuthApi {

    async login(data: Login): Promise<LoginResponse> {
        const response: AxiosResponse = await agent.post(
            `auth/login`, data
        );

        if (response.status === 200 || response.status === 201) {
            const {id, email, access_token } = response.data;
            localStorage.setItem('quickly_summary_token', JSON.stringify({id, email, access_token}))
            return response.data;
        }

        return undefined;
    }

    async register(data: Register): Promise<RegisterResponse> {
        const response: AxiosResponse = await agent.post(
            `auth/register`, data
        );

        if (response.status === 200 || response.status === 201) {
            return response.data;
        }

        return undefined;
    }


    async loginViaToken(token: string): Promise<boolean> {
        const response: AxiosResponse = await agent.get(
            `auth/login-token/${token}`
        );

        if (response.status === 200 || response.status === 201) {
            return true;
        }

        return undefined;
    }

}

const authApi = new AuthApi();
export default authApi;
