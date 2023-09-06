export type Role = "user" | "admin" | "ref";

export type Category = {
    name: string,
    teams: string[],
}