import React from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function ClickHandler({ setRegion }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
        alert('Invalid location selected on map.');
        return;
      }
     
      setRegion(`lat:${lat.toFixed(2)},lon:${lng.toFixed(2)}`);
    }
  });
  return null;
}

function Recenter({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

function MapView({ setRegion, center }) {
  return (
    <div className="bg-white p-4 rounded shadow h-[400px]">
      <label className="block font-medium mb-2">Click on Map to Select Custom Region</label>
      <MapContainer
        center={center}
        zoom={4}
        scrollWheelZoom={true}
        className="h-full w-full rounded"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Recenter center={center} />
        <ClickHandler setRegion={setRegion} />
      </MapContainer>
    </div>
  );
}

export default MapView;
