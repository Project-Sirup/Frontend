import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Generator, RawGenerator } from '../models/Generator';
import aj from "../util/AJ";

export const generators: Writable<Generator[]> = writable<Generator[]>([]);

class GeneratorViewModel {

    getAll = async () => {
        const res = await aj().register().GET<RawGenerator[]>("");
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
    }
}

const gvm = () => {
    return new GeneratorViewModel();
}

export default gvm;