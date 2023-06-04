'use client';
import { Event } from '@prisma/client';

import Link from 'next/link';

const EventBox = ({ event }: { event: Event }) => {
  return (
    <div>
      <Link
        href={{
          pathname: '/map',
          query: { lat: event.lat, long: event.long },
        }}
      >
        <span>{event.name + ' ' + event.description}</span>
      </Link>
    </div>
  );
};

export default EventBox;
