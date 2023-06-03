'use client';

import Link from 'next/link';

const EventBox = () => {
  return (
    <div>
      <Link
        href={{
          pathname: '/map',
          query: { lat: 51.1621512, long: 17.0261437 },
        }}
      >
        <span>event</span>
      </Link>
    </div>
  );
};

export default EventBox;
