import getEvents from '@/app/actions/getEvents';
import Sidebar from '@/app/components/sidebar/Sidebar';
import React from 'react';
import EventList from './components/EventList';
import WhichMap from './components/WhichMap';

export default async function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const events = await getEvents();

  return (
    // @ts-expect-error Server Component
    <Sidebar>
      <div className="h-full">
        <EventList events={events} />
        <div className="hidden h-full lg:block lg:pl-80">
          <WhichMap events={events} />
        </div>

        {children}
      </div>
    </Sidebar>
  );
}
