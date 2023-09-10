import { Team } from "./interfaces";

export type Role = "user" | "admin" | "ref";

export type Group = {
  name: string;
  masc: boolean;
  teams: Team[];
};

export type Category = {
  name: string;
  special: boolean;
  groups: Group[];
};

export type TeamsToDisplay = {
  men: Team[];
  women: Team[];
};

export type GroupsToDisplay = {
  men: Group[];
  women: Group[];
};

export const defaultCategory: Category = {
  name: "",
  special: false,
  groups: [],
};
