import type { User } from "./User";

export type Project = {
    projectName: string;
    projectId: string;
    organisationId: string;
    users: Map<User, string>;
}

export type ProjectPermission = {
    projectId: string;
    userId: string;
    permissionId: number;
}