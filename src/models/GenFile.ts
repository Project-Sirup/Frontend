export type GenFile = {
    sirup_v: number;
    docker: boolean;
    microservice: GenMicroservice;
}

export type GenMicroservice = {
    microserviceName: string;
    language: GenLanguage;
    database: GenDatabase;
    api: GenApi;
    external: GenExternal;
}

export type GenLanguage = {
    name: string;
    options: object;
}

export type GenDatabase = {
    name: string;
    options: object;
    data: GenData;
}

export type GenData = {
    collections: GenCollection[]
}

export type GenCollection = {
    name: string;
    fields: GenField[];
}

export type GenField = {
    name: string;
    type: string;
    ref: string | undefined;
}

export type GenApi = {
    type: string;
    options: object;
}

export type GenExternal = {
    name: string;
}