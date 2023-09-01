import { VolleyEvent } from "@/firebase/interfaces";

export function categorizeEvents(events: VolleyEvent[]): { futureEvents: VolleyEvent[]; pastEvents: VolleyEvent[] } {
    const today = new Date();

    const futureEvents = events.filter((event) => {
        const endDate = new Date(event.endDate);
        return endDate >= today;
    });

    const pastEvents = events.filter((event) => {
        const endDate = new Date(event.endDate);
        return endDate < today;
    });

    return { futureEvents, pastEvents };
}
export function findClosestEvent(events: VolleyEvent[]): VolleyEvent | null {
    const today = new Date();

    const closestEvent = events.reduce((closest, event) => {
        const eventStartDate = new Date(event.startDate);
        const eventEndDate = new Date(event.endDate);

        const startDateDifference = Math.abs(today.getTime() - eventStartDate.getTime());
        const endDateDifference = Math.abs(today.getTime() - eventEndDate.getTime());

        if (startDateDifference < closest.difference || endDateDifference < closest.difference) {
            return {
                event,
                difference: Math.min(startDateDifference, endDateDifference),
            };
        }

        return closest;
    }, { event: null as VolleyEvent | null, difference: Infinity });

    return closestEvent.event;
}

export function sortEventsByStartDate(events: VolleyEvent[]): VolleyEvent[] {
    const sortedEvents = events.slice().sort((a, b) => {
        const dateA = new Date(a.startDate);
        const dateB = new Date(b.startDate);

        return dateA.getTime() - dateB.getTime();
    });

    return sortedEvents;
}


