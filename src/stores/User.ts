import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Organisation } from "../models/Organisation";
import type { User } from "../models/User";
import aj from '../util/AJ';
import type { ApiResponse } from '../util/AJ';
import ovm, { organisation, organisations } from './Organisation';
import pvm, { project } from './Project';
import mvm, { microservice } from './Microservice';

export const user: Writable<User | null > = writable<User | null>(null);

export const token: Writable<string | null> = writable<string | null>(null);

class UserViewModel {
    
    init = async (): Promise<boolean> => {
        if (browser) {
            const localUser = localStorage.getItem("user");
            const _token = localStorage.getItem("token");
            if (localUser) {
                const _user = JSON.parse(localUser) as User;
                if (_token) {
                    aj().internal(_token, _user.userId, _user.systemAccess);
                    user.set(_user);
                    token.set(_token);
                    return true;
                }
            }
        }
        return false;
    }

    create = async (_user: User): Promise<boolean> => {
        const res = await aj().user().POST<User, {user: User, token: string}>("/user", _user);
        return UserViewModel.handleUser(res);
    }

    login = async (_user: User): Promise<boolean> => {
        const res = await aj().user().POST<User, {user: User, token: string}>("/user/login", _user);
        return UserViewModel.handleUser(res);

    }

    private static handleUser(res: ApiResponse<{ user: User; token: string } | null>) {
        if (!res || !res.data) {
            return false;
        }
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
        user.set(res.data.user);
        token.set(res.data.token);
        aj().internal(res.data.token, res.data.user.userId, res.data.user.systemAccess);
        return true;
    }

    logout = async (): Promise<void> => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        user.set(null);
        token.set(null);
        await ovm().set(null);
        await pvm().set(null);
        await mvm().set(null);
    }

    findOrganisations = async (): Promise<Organisation[]> => {
        try {
            const res = await aj().user().GET_PROTECTED<Organisation[]>("/organisation");
            organisations.set(res.data);
            return res.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    }

    update = async (_user: User): Promise<User> => {
        const res = await aj().user().PUT_PROTECTED<User, User>(`/user/${_user.userId}`, _user);
        localStorage.setItem("user", JSON.stringify(res.data));
        user.set(res.data);
        return res.data;
    }

    delete = async (_user: User): Promise<void> => {
        await aj().user().DELETE_PROTECTED<null>(`/user/${_user.userId}`);
    }

}

const uvm = () => {
    return new UserViewModel();
}

export default uvm;
