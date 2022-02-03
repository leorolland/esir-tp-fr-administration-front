import { User } from "./User";

export type Association = {
    name: string,
    date: Date,
    members: Array<User>,
}