import { Team } from "./interfaces";

export type Role = "user" | "admin" | "ref";

export type Group = {
    name: string,
    masc: boolean,
    teams: Team[],
}

export type Category = {
    name: string,
    special: boolean,
    groups: Group[],
}

export const defaultCategory : Category = {name: '',special: false, groups: []}