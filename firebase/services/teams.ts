import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firebaseDB } from "../app";
import { Team } from "../interfaces";

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

export async function GetAllTeamsFromEvent(eventID: string) {
  try {
    const querySnapshot = await getDocs(
      query(collection(firebaseDB, "teams"), where("eventId", "==", eventID))
    );

    if (querySnapshot.empty) return null;

    const teams: Team[] = [];
    querySnapshot.forEach((doc) => {
      const teamData = doc.data() as Team;
      teams.push(teamData);
    });
    
    return teams;
  } catch (error) {
    console.error("Error fetching teams of an event:", error);
  }
}

export async function GetTeamsFromEventCategory(eventID: string | undefined, category: string) {
  try {
    const querySnapshot = await getDocs(
      query(collection(firebaseDB, "teams"), where("eventId", "==", eventID), where("categories", "array-contains", category))
    );

    if (querySnapshot.empty) return null;

    const teams: Team[] = [];
    querySnapshot.forEach((doc) => {
      const teamData = doc.data() as Team;
      teams.push(teamData);
    });

    return teams;
  } catch (error) {
    console.error("Error fetching teams of a category:", error);
  }
}
