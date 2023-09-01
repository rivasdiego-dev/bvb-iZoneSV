import { VolleyEvent } from "@/firebase/interfaces";
import { GetAllEvents } from "@/firebase/services/events";
import { useEffect, useState } from "react";

export default function useFetchEvents() {
  const [volleyEvents, setVolleyEvents] = useState<VolleyEvent[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  async function fetchEvents() {
    try {
      const fetchedEvents = await GetAllEvents();
      if (fetchedEvents) {
        setVolleyEvents([...fetchedEvents]);
      }
    } catch (error) {
      // Handle error if needed
    } finally {
      setLoading(false); // Set loading to false when fetch completes
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  // Return both the data and loading state
  return { volleyEvents, loading };
}
