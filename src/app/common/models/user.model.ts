export interface Roles {
    investigator: boolean;
    admin?: boolean;
}

export class User {
    email: string;
    firstName: string;
    lastName: string;
    roles: Roles;

    constructor(authData) {
        this.email = authData.email
        this.firstName = authData.firstName
        this.lastName = authData.lastName
        this.roles = { investigator: true }
    }
}