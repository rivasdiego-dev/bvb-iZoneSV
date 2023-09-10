import { collection, doc, setDoc } from "firebase/firestore";
import { Game } from "../interfaces";
import { firebaseDB } from "../app";

export async function CreateNewGame(game: Game) {
  const newGameRef = doc(collection(firebaseDB, "games"));
  game.finished = false;
  game.winnerID = "";
  game.id = newGameRef.id;

  try {
    await setDoc(newGameRef, game);
  } catch (error) {
    console.error(error);
  }

  return newGameRef.id;
}
