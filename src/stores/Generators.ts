import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Generator, RawGenerator } from '../models/Generator';
import aj from "../util/AJ";
import type { GenFile } from '../models/GenFile';

export const generators: Writable<Generator[]> = writable<Generator[]>([]);

class GeneratorViewModel {

    getAll = async (): Promise<Generator[]> => {
        const res = await aj().register().GET<RawGenerator[]>("/register");
        console.log("res",res);
        const gens: Generator[] = [];
        res.data.forEach(rawGen => {
            const gen: Generator = {
                serviceId: rawGen.serviceId,
                serviceName: rawGen.serviceName,
                serviceAddress: rawGen.serviceAddress,
                manifest: JSON.parse(rawGen.manifest)
            }
            gens.push(gen);
        })
        console.log("gens",gens);
        generators.set(gens);
        return gens;
    }

    generate = async (url: string, genFile: GenFile): Promise<string> => {
        const res = await aj().generator(url).POST<GenFile,string>("", genFile);
        return res.data;
    }
}

const gvm = () => {
    return new GeneratorViewModel();
}

export default gvm;