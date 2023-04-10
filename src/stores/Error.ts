import { writable, type Writable } from "svelte/store";

export type Error = {
    code: number;
    type: string;
    message: string;
}

export const error: Writable<Error | undefined> = writable<Error | undefined>(undefined);