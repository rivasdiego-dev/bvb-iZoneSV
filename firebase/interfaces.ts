import { Role } from "./types";

export interface User {
  id: string;
  displayName: string | null;
  email: string | null;
  roles: Role[];
}

export interface Place {
  id?: string;
  imageURL: string;
  name: string;
}

export interface VolleyEvent {
  id: string;
  shown: boolean;
  name: string;
  description: string;
  placeID: string;
  categories: string[];
  startDate: string;
  endDate: string;
}

export interface Team {
  id: string;
  eventId: string;
  masc: boolean;
  player1: string;
  player2: string;
  teamName: string;
  categories: string[];
  gamesWon: number;
  gamesLose: number;
  gamePoints: number;
  pointsFavor: number;
  pointsAgainst: number;
  average: number;
}
