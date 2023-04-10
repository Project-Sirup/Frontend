export type RawGenerator = {
    serviceId: string;
    serviceName: string;
    serviceAddress: string;
    manifest: string;
}

export type Generator = {
    serviceId: string;
    serviceName: string;
    serviceAddress: string;
    manifest: Manifest;
}

export type Manifest = {
    sirup_v: number;
    acceptedFormats: string[];
    templates: string[];
    languages: Language[];
    apiTypes: ApiType[];
    databases: Database[];
    dataTypes: DataType[];
}
export type Language = {
    language: string;
    description: string;
    options: Map<string,OptionType>;
}

export type ApiType = {
    apiType: string;
    description: string;
    options: Map<string,OptionType>;
}

export type Database = {
    database: string;
    description: string;
    supportedTypes: string[],
    options: Map<string,OptionType>;
}

export type DataType = {
    a: string;
}
export type OptionType = {
    selection?: string[],
    value: string;
}