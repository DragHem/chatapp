'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Routing from './Routing';

const Map = () => {
  const [loca, setLoca] = useState<{ lat: number; long: number }>();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLoca({
        lat: position.coords.latitude,
        long: position.coords.longitude,
      });
    });
  }, []);
  return (
    <MapContainer
      id="map"
      zoom={14}
      center={[51.112443, 17.06483]}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {loca && <Routing waypoints={loca}></Routing>}
    </MapContainer>
  );
};

export default Map;
