import { VolleyEvent } from "@/firebase/interfaces";
import { GetAllEvents } from "@/firebase/services/events";
import { useEffect, useState } from "react";

export default function useFetchEvents() {
    const [volleyEvents, setVolleyEvents] = useState<VolleyEvent[]>([]);
  
    async function fetchEvents() {
      try {
        const fetchedEvents = await GetAllEvents();
        if (fetchedEvents) {
          setVolleyEvents([...fetchedEvents]);
        }
      } catch (error) {
        // Handle error if needed
      }
    }
  
    useEffect(() => {
      fetchEvents();
    }, []);
  
    return volleyEvents;
  }