'use client';

import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Routing from './Routing';

const Map = () => {
  const params = useSearchParams();
  console.log('PARAMS!', params);
  const [loca, setLoca] = useState<{ lat: number; long: number }>();
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

  if (!params) return null;

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
          <Routing
            from={loca}
            to={{ lat: params.get('lat'), long: params.get('long') }}
          ></Routing>
        </MapContainer>
      )}
    </>
  );
};

export default Map;
