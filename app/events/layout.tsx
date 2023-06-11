import getEvents from '@/app/actions/getEvents';
import Sidebar from '@/app/components/sidebar/Sidebar';
import React from 'react';
import EventList from './components/EventList';

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
        {children}
      </div>
    </Sidebar>
  );
}
