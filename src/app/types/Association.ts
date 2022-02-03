import { User } from "./User";

export type Association = {
    name: string,
    dateOfCreation: string,
    members: Array<User>,
}