'use client';

import EventBox from './EventBox';

const EventList = () => {
  return (
    <aside className="fixed inset-y-0 left-0 block overflow-y-auto border-r border-gray-200 pb-20 lg:left-20 lg:block lg:w-80 lg:pb-0">
      <div className="px-5">
        <div className="flex-coll">
          <div className="py-4 text-2xl font-bold text-neutral-800">People</div>
        </div>
        {[0, 1, 2].map((event) => (
          <EventBox key={event} />
        ))}
      </div>
    </aside>
  );
};

export default EventList;
