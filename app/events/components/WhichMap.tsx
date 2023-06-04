'use client';
import { Event } from '@prisma/client';
import { useState } from 'react';
import AddNewEvent from './AddNewEvent';
import EventsOnMap from './EventsOnMap';
import NewEventLocation from './NewEventLocation';

const WhichMap = ({ events }: { events: Event[] }) => {
  const [which, setWhich] = useState(true);
  const [eventLoca, setEventLoca] = useState<{ lat: number; long: number }>();

  return (
    <>
      <button onClick={() => setWhich((prev) => !prev)}>
        {which ? 'Add new' : 'Cancel'}
      </button>
      {which ? (
        <>
          <EventsOnMap events={events} />
        </>
      ) : (
        <>
          <AddNewEvent eventLoca={eventLoca} />
          <NewEventLocation setEventLoca={setEventLoca} />
        </>
      )}
    </>
  );
};

export default WhichMap;
