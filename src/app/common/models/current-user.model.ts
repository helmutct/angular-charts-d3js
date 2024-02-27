export class CurrentUser {

    id: number;
    username: string;
    token: string;
    name: string;
    roleUserId: number;
    roleUserName: string;
    memberSinceMonth: number;
    memberSinceYear: number;
    idInstitutionAssociated: number;
    nameInstitutionAssociated: string;

    constructor(
        id: number,
        username: string,
        token: string,
        name: string,
        roleUserId: number,
        roleUserName: string,
        memberSinceMonth: number,
        memberSinceYear: number,
        idInstitutionAssociated: number,
        nameInstitutionAssociated: string
    ) {
        this.id = id;
        this.username = username;
        this.token = token;
        this.name = name;
        this.roleUserId = roleUserId;
        this.roleUserName = roleUserName;
        this.memberSinceMonth = memberSinceMonth;
        this.memberSinceYear = memberSinceYear;
        this.idInstitutionAssociated = idInstitutionAssociated;
        this.nameInstitutionAssociated = nameInstitutionAssociated;
    }
}
