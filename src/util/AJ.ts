import { error } from "../stores/Error";
import type { Error } from "../stores/Error";
import uvm from "../stores/User";

export type ApiResponse<T> = {
    statusCode: number;
    message: string;
    data: T;
}

class _AJ{

    private static instance:_AJ;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    private constructor() {}

    public static getInstance(): _AJ {
        return _AJ.instance ? _AJ.instance : _AJ.instance = new _AJ();
    }

    internal = (token: string, userId: string, systemAccess: string) => {
        AJ.getInstance().internal(token, userId, systemAccess);
    }

    user = () => {
        return AJ.getInstance()._url("http://127.0.0.1:2103/api/v1");
    }

    register = () => {
        return AJ.getInstance()._url("http://127.0.0.1:2100/api/v1");
    }

    generator = (url: string) => {
        return AJ.getInstance()._url(url);
    }
}

class AJ{
    
    private url: string | undefined;
    private static instance: AJ;
    private static token: string;
    private static userId: string;
    private static systemAccess: string;
    private constructor() {
        //TODO: get from .env
        //this.url = "http://127.0.0.1:2103/api/v1";
    }

    public static getInstance(): AJ {
        return AJ.instance ? AJ.instance : AJ.instance = new AJ();
    }

    _url = (url: string) => {
        this.url = url;
        return this;
    } 

    internal = (token: string, userId: string, systemAccess: string) => {
        AJ.token = token;
        AJ.userId = userId;
        AJ.systemAccess = systemAccess;
    }

    GET = async <R>(endpoint: string): Promise<ApiResponse<R>> => {
        const res = await fetch(`${this.url}${endpoint}`,{
            method: "GET",
            headers: {
                "Content-Type": "Application/json"
            },
        });
        return await res.json();
    }

    GET_PROTECTED = async <R>(endpoint: string): Promise<ApiResponse<R>> => {
        try {
            const res = await fetch(`${this.url}/protected${endpoint}`,{
                method: "GET",
                headers: this._protected_header(),
            });
            if (res.status === 200) {
                return await res.json();
            }
            return { statusCode: res.status, message: res.statusText, data: null } as ApiResponse<null>;
        } catch (err) {
            console.log(err);
            await uvm().logout();
            return { statusCode: 503, message: "Service Unavailable", data: null } as ApiResponse<null>;
        }
    }

    POST = async <S,R>(endpoint: string, body: S): Promise<ApiResponse<R | null>> => {
        try {
            const res = await fetch(`${this.url}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify(body),
            });
            if (res.status === 200 || res.status === 201) {
                return await res.json();
            }
            return { statusCode: res.status, message: res.statusText, data: null } as ApiResponse<null>;
        } catch (err) {
            console.log(err);
            error.set({ code: 503, type: "Service", message: "Service Unavailable" } as Error);
            return { statusCode: 503, message: "Service Unavailable", data: null } as ApiResponse<null>;
        }
    }

    POST_PROTECTED = async <S,R>(endpoint: string, body: S): Promise<ApiResponse<R>> => {
        try {
            const res = await fetch(`${this.url}/protected${endpoint}`, {
                method: "POST",
                headers: this._protected_header(),
                body: JSON.stringify(body),
            });
            if (res.status === 200 || res.status === 201) {
                return await res.json();
            }
            return { statusCode: res.status, message: res.statusText, data: null } as ApiResponse<null>;
        } catch (err) {
            console.log(err);
            error.set({ code: 503, type: "Service", message: "Service Unavailable" } as Error);
            return { statusCode: 503, messagE: "Service Unvailable", data: null } as ApiResponse<null>;
        }
    }

    PUT_PROTECTED = async <S,R>(endpoint: string, body: S): Promise<ApiResponse<R>> => {
        const res = await fetch(`${this.url}/protected${endpoint}`, {
            method: "PUT",
            headers: this._protected_header(),
            body: JSON.stringify(body),
        });
        return await res.json();
    }

    DELETE_PROTECTED = async <R>(endpoint: string): Promise<ApiResponse<R>> => {
        const res = await fetch(`${this.url}/protected${endpoint}`, {
            method: "DELETE",
            headers: this._protected_header(),
        });
        return await res.json();
    }

    _protected_header = (token = AJ.token, userId = AJ.userId, systemAccess = AJ.systemAccess) => {
        return {
            "Token": token,
            "UserId": userId,
            "SystemAccess": systemAccess,
            "Content-Type": "Application/json"
        }
    }
}

const aj = () => {
    return _AJ.getInstance();
}

export default aj;