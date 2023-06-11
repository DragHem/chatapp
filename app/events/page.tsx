import WhichMap from '@/app/events/components/WhichMap';
import React from 'react';
import getEvents from '@/app/actions/getEvents';

const Events = async () => {
  const events = await getEvents();

  return (
    <div className="h-full lg:block lg:pl-80">
      <WhichMap events={events} />
    </div>
  );
};

export default Events;
