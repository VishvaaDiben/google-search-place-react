import 'leaflet/dist/leaflet.css';

import { Marker, useMap } from 'react-leaflet';
import React, { useEffect } from 'react';

const MapComponent = ({ position }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);

  return position ? <Marker position={position}></Marker> : null;
};

export default MapComponent;