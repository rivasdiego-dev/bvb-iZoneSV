import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { firebaseDB } from "../app";
import { Place, VolleyEvent } from "../interfaces";

export const defaultVolleyEvent: VolleyEvent = {
  name: "",
  description: "",
  placeID: "",
  categories: [],
  startDate: "",
  endDate: "",
};

export const defaultPlace: Place = {
  name: "Select a place...",
  imageURL: "",
};

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

export async function GetPlaceByID(ID: string) {
  try {
    const placesRef = collection(firebaseDB, "places");
    const q = query(placesRef, where("id", "==", ID));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const doc = querySnapshot.docs[0];
    const placeData = doc.data() as Place;
    return placeData;

  } catch (error) {
    console.error("Error fetching place by ID:", error);
  }
}

export async function GetAllEvents(): Promise<VolleyEvent[] | undefined> {
  try {
    const querySnapshot = await getDocs(collection(firebaseDB, "events"));
    const allEvents: VolleyEvent[] = [];
    querySnapshot.forEach((doc) => {
      const eventData = doc.data() as VolleyEvent;
      allEvents.push(eventData);
    });
    return allEvents;
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

export async function CreateNewEvent(volleyEvent: VolleyEvent) {
  volleyEvent.shown = false;
  try {
    await addDoc(collection(firebaseDB, "events"), volleyEvent);
  } catch (error) {
    console.error(error);
  }
}
