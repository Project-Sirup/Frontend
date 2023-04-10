import type { User } from "./User";
import type { GenFile } from './GenFile';

export type Microservice = {
    microserviceName: string;
    microserviceId: string;
    projectId: string;
    microserviceFile: GenFile;
    users: Map<User, string>;
}

export type MicroservicePermission = {
    microserviceId: string;
    userId: string;
    permissionId: string;
}