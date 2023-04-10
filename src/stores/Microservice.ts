import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Microservice } from "../models/Microservice";
import { browser } from "$app/environment";
import aj from "../util/AJ";

let _micro;

if(browser) {
    console.log("browser");
    const localMicro = localStorage.getItem("last_microservice");
    if (localMicro) {
        _micro = JSON.parse(localMicro) as Microservice;
    }
}

export const microservices: Writable<Microservice[]> = writable<Microservice[]>([]);

export const microservice: Writable<Microservice | null> = writable<Microservice | null>(_micro);

class MicroserviceViewModel {

    create = async (_microservice: Microservice): Promise<Microservice> => {
        const res = await aj().user().POST_PROTECTED<Microservice,Microservice>("/microservice", _microservice);
        localStorage.setItem("last_microservice", JSON.stringify(res.data));
        microservice.set(res.data);
        return res.data;
    }

    set = async (_microservice: Microservice): Promise<Microservice> => {
        localStorage.setItem("last_microservice", JSON.stringify(_microservice));
        microservice.set(_microservice);
        return _microservice;
    }

    save = async (_microservice: Microservice) => {
        const res = await aj().user().PUT_PROTECTED<Microservice,Microservice>(`/microservice/${_microservice.microserviceId}`,_microservice);
        console.log(res.data);
    }

    findAll = async (projectId: string): Promise<Microservice[]> => {
        const res = await aj().user().GET_PROTECTED<Microservice[]>(`/microservice/project/${projectId}`);
        microservices.set(res.data);
        return res.data;
    }
}

const mvm = () => {
    return new MicroserviceViewModel();
}

export default mvm;