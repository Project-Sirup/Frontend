import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";
import type { Organisation } from "../models/Organisation";
import aj from "../util/AJ";
import type { User } from "../models/User";

let _org;

if (browser) {
    console.log("brower");
    
    const localOrg = localStorage.getItem("last_organisation");
    if (localOrg !== null && localOrg !== undefined) {
        _org = JSON.parse(localOrg) as Organisation;
    }
}

export const organisations: Writable<Organisation[]> = writable<Organisation[]>([]);

export const organisation: Writable<Organisation | null> = writable<Organisation | null>(_org);

export const organisationUsers: Writable<Map<string, User[]>> = writable<Map<string, User[]>>(new Map());

export function deepStore(organisation: Organisation) {
    localStorage.setItem("organisation", JSON.stringify(organisation));
}

class OrganisationViewModel {

    create = async (organisation: Organisation): Promise<Organisation> => {
        const res = await aj().user().POST_PROTECTED<Organisation, Organisation>("/organisation", organisation);
        organisations.update(orgs => [...orgs, res.data]);
        localStorage.setItem("last_organisation", JSON.stringify(res.data));
        return res.data;
    }

    set = async (_organisation: Organisation): Promise<void> => {
        localStorage.setItem("last_organisation", JSON.stringify(_organisation));
        organisation.set(_organisation);
    }

    find = async (organisationId: string): Promise<Organisation> => {
        const res = await aj().user().GET_PROTECTED<Organisation>(`/organisation/${organisationId}`);
        return res.data;
    }

    update = async (organisation: Organisation): Promise<Organisation> => {
        const res = await aj().user().PUT_PROTECTED<Organisation, Organisation>("/organisation", organisation);
        return res.data;
    }

    delete = async (organisationId: string): Promise<void> => {
        await aj().user().DELETE_PROTECTED<null>(`/organisation/${organisationId}`);
    }

    findUsers = async (organisationId: string): Promise<Map<string, User[]>> => {
        const res = await aj().user().GET_PROTECTED<Map<string, User[]>>(`/organisation/${organisationId}/users`);
        const map: Map<string, User[]> = new Map();
        const data = res.data as Map<string, User[]>;
        console.log(typeof data);
        
        //data.forEach((arr, permission, m) => {
        //    map.set(permission, arr);
        //})
        organisationUsers.set(res.data);
        //console.log(map.get("OWNER"));
        
        return res.data;
    }
}

const ovm = () => {
    return new OrganisationViewModel();
}

export default ovm;