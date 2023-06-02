'use client';

import { createControlComponent } from '@react-leaflet/core';
import 'leaflet';
import 'leaflet-routing-machine';
declare let L: any;

const createRoutineMachineLayer = (props: any) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(props.waypoints.lat, props.waypoints.long),
      L.latLng(51.156432592015096, 17.044738107803084),
    ],
    lineOptions: {
      styles: [{ color: '#6FA1EC', weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
  });

  return instance;
};

const Routing = createControlComponent(createRoutineMachineLayer);

export default Routing;
