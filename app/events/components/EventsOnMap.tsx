'use client';
import { Event } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

export default function EventsOnMap({ events }: { events: Event[] }) {
  const [loca, setLoca] = useState<{ lat: number; long: number }>();
  const router = useRouter();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const newLoca = {
        lat: position.coords.latitude,
        long: position.coords.longitude,
      };
      setLoca(newLoca);
      axios.post('/api/location', newLoca);
    });
  }, []);
  return (
    <>
      {loca && (
        <MapContainer
          id="map"
          zoom={14}
          center={[loca.lat, loca.long]}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {events.map((event) => {
            return (
              <>
                {event.lat && event.long && (
                  <Marker key={event.id} position={[event.lat, event.long]}>
                    <Popup>
                      {event.name + ' ' + event.description + ' '}
                      <button
                        onClick={() => {
                          router.push(
                            '/map/?lat=' + event.lat + '&long=' + event.long
                          );
                        }}
                      >
                        ROUTE
                      </button>
                    </Popup>
                  </Marker>
                )}
              </>
            );
          })}
        </MapContainer>
      )}
    </>
  );
}
