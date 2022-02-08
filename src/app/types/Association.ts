import { MemberAssociation } from "./MemberAssociation";

export type Association = {
    name: string,
    dateOfCreation: string,
    members: MemberAssociation[],
}