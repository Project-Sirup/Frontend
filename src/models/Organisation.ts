import type { User } from "./User";

export type Organisation = {
    organisationName: string;
    organisationId: string;
    users: Map<User, string>;
}

export type OrganisationPermission = {
    organisationId: string;
    userId: string;
    permissionId: number;
}