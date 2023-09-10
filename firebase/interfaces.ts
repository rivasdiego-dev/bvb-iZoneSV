import { Category, Gender, Role } from "./types";

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
  categories: Category[];
  startDate: string;
  endDate: string;
}

export interface Team {
  id: string;
  eventId: string;
  gender: Gender;
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

export interface Game {
  id: string;
  gender: Gender;
  eventID: string;
  category: string;
  group: string;
  finished: boolean;
  winnerID: string;
  team1ID: string;
  team1Name: string;
  team1Sets: number;
  team1Points: number;
  team2ID: string;
  team2Name: string;
  team2Sets: number;
  team2Points: number;
}
