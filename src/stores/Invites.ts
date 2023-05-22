import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Invite } from "../models/Invite";
import aj from "../util/AJ";

export const invites: Writable<Invite[]> = writable<Invite[]>([]);

type InviteRepose = {
    invite: Invite,
    accepted: boolean;
}

class InviteViewModel {

    findAll = async (): Promise<Invite[]> => {
        const res = await aj().user().GET_PROTECTED<Invite[]>("/invite/received");
        invites.set(res.data);
        return res.data;
    }

    invite = async (invite: Invite): Promise<void> => {
        await aj().user().POST_PROTECTED<Invite,null>("/invite", invite);
        console.log("invite send");
    }

    respond = async (invite: Invite, accepted: boolean): Promise<void> => {
        await aj().user().POST_PROTECTED<InviteRepose,null>("/invite/response",{invite: invite, accepted: accepted} as InviteRepose);
    }
}

const ivm = () => {
    return new InviteViewModel();
}

export default ivm;