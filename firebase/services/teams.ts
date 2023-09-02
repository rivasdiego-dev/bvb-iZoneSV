import { Team } from "../interfaces";
import { firebaseDB } from "../app";
import { collection, doc, setDoc } from "firebase/firestore";

export const defaultTeam: Team = {
  id: "",
  eventId: "",
  masc: false,
  player1: "",
  player2: "",
  teamName: "",
  categories: [],
  gamesWon: 0,
  gamesLose: 0,
  gamePoints: 0,
  pointsFavor: 0,
  pointsAgainst: 0,
  average: 0,
};

export async function CreateNewTeam(team: Team, eventId: string) {
  team.teamName = `${team.player1} / ${team.player2}`;
  team.eventId = eventId;
  const newTeamRef = doc(collection(firebaseDB, "teams"));
  team.id = newTeamRef.id;
  try {
    await setDoc(newTeamRef, team);
  } catch (error) {
    console.error(error);
  }
}
