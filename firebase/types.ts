import { Team } from "./interfaces";

export type Role = "user" | "admin" | "ref";

export type Gender = "man" | "woman" | "mix";

export type Group = {
  name: string;
  gender: Gender;
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
  mix: Team[];
};

export type GroupsToDisplay = {
  men: Group[];
  women: Group[];
  mix: Group[];
};

export const defaultCategory: Category = {
  name: "",
  special: false,
  groups: [],
};
