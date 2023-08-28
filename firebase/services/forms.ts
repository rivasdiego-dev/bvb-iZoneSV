import { addDoc, collection, getDocs } from "firebase/firestore";
import { firebaseDB } from "../app";
import { Place, VolleyEvent } from "../interfaces";

export const defaultVolleyEvent: VolleyEvent = {
  name: "",
  description: "",
  placeID: "",
  categories: [],
  startDate: new Date(Date.now()),
  endDate: new Date(Date.now()),
};

export const defaultPlace: Place = {
    name: "Select a place..."
}

export async function GetAllPlaces(): Promise<Place[] | undefined> {
  try {
    const querySnapshot = await getDocs(collection(firebaseDB, "places"));
    const places: Place[] = [];
    querySnapshot.forEach((doc) => {
      const placeData = doc.data() as Place;
      places.push(placeData);
    });
    return places;
  } catch (error) {
    console.error("Error fetching places:", error);
  }
}

export async function CreateNewEvent(volleyEvent: VolleyEvent) {
  try {
    await addDoc(collection(firebaseDB, "events"), volleyEvent);
  } catch (error) {
    console.error(error);
  }
}
