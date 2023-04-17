import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Microservice, RawMicroservice } from '../models/Microservice';
import { browser } from "$app/environment";
import aj from "../util/AJ";
import type { GenFile } from '../models/GenFile';

let _micro;

if(browser) {
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

    find = async (microserviceId: string) => {
        const res = await aj().user().GET_PROTECTED<Microservice>(`/microservice/${microserviceId}`);
        console.log(res);
        microservice.set(res.data);
    }

    findAll = async (projectId: string): Promise<Microservice[]> => {
        const res = await aj().user().GET_PROTECTED<RawMicroservice[]>(`/microservice/project/${projectId}`);
        const microArr: Microservice[] = [];
        res.data.forEach(rawMicroservice => {
            const microservice: Microservice = {
                microserviceId: rawMicroservice.microserviceId,
                microserviceName: rawMicroservice.microserviceName,
                projectId: rawMicroservice.projectId,
                user: rawMicroservice.users,
            } as Microservice;
            if (rawMicroservice.microserviceFile?.type === "json") {
                const paresGenFile = rawMicroservice.microserviceFile.value;
                console.log(JSON.parse(paresGenFile));
                microservice.microserviceFile = JSON.parse(rawMicroservice.microserviceFile.value);
            }
            //console.log(microservice);
            microArr.push(microservice);
        })
        microservices.set(microArr);
        return microArr;
    }

}

const mvm = () => {
    return new MicroserviceViewModel();
}

export default mvm;