'use client';

import { createControlComponent } from '@react-leaflet/core';
import 'leaflet';
import 'leaflet-routing-machine';

declare let L: any;

const createRoutineMachineLayer = (props: any) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(props.from.lat, props.from.long),
      L.latLng(props.to.lat, props.to.long),
    ],
    lineOptions: {
      styles: [{ color: '#6FA1EC', weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: true,
    createMarker: function (i: number, waypoint: any, n: number) {
      const marker = L.marker(waypoint.latLng, {
        draggable: true,
        bounceOnAdd: false,
        bounceOnAddOptions: {
          duration: 1000,
          height: 800,
        },
        icon: L.icon({
          iconUrl: i === 1 ? '../assets/in.png' : '../assets/out.png',
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        }),
      });
      return marker;
    },
  });

  return instance;
};

const Routing = createControlComponent(createRoutineMachineLayer);

export default Routing;
