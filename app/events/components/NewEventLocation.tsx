'use client';
import axios from 'axios';
import 'leaflet';
import { Layer } from 'leaflet';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';

declare let L: any;
type Props = Dispatch<
  SetStateAction<
    | {
        lat: number;
        long: number;
      }
    | undefined
  >
>;

function MyComponent({ setEventLoca }: { setEventLoca: Props }) {
  var marker: Layer | null = null;
  const map = useMapEvent('click', () => {
    map.on('click', function (e) {
      if (marker !== null) {
        map.removeLayer(marker);
      }
      marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      setEventLoca({ lat: e.latlng.lat, long: e.latlng.lng });
    });
  });
  return null;
}

export default function NewEventLocation({
  setEventLoca,
}: {
  setEventLoca: Props;
}) {
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

  return (
    <>
      {loca && (
        <MapContainer
          id="map"
          zoom={14}
          center={[loca.lat, loca.long]}
          className="h-full w-full"
        >
          <MyComponent setEventLoca={setEventLoca} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      )}
    </>
  );
}
