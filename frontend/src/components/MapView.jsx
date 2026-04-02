import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Component to handle auto-centering when a station is selected
const RecenterMap = ({ selectedStation }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedStation) {
      map.flyTo([selectedStation.lat, selectedStation.lng], 14, { duration: 1.5 });
    }
  }, [selectedStation, map]);
  return null;
};

const getMarkerColor = (queueStatus) => {
  if (queueStatus === 'Short') return '#22c55e';
  if (queueStatus === 'Medium') return '#f59e0b';
  if (queueStatus === 'Long') return '#ef4444';
  return '#6b7280';
};

const MapView = ({ stations, recommendedStation, selectedStation, onSelectStation }) => {
  return (
    <div className="w-full h-[calc(100vh-64px)] lg:h-full z-0 relative">
      <MapContainer 
        center={[19.076, 72.8777]} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        
        <RecenterMap selectedStation={selectedStation} />

        {stations.map(station => {
          const isRecommended = recommendedStation?._id === station._id;
          const isSelected = selectedStation?._id === station._id;
          const color = getMarkerColor(station.queue_status);
          
          return (
            <CircleMarker
              key={station._id}
              center={[station.lat, station.lng]}
              radius={isRecommended || isSelected ? 16 : 10}
              fillColor={station.fuel_status === 'Out of Stock' ? '#4b5563' : color}
              fillOpacity={0.8}
              color={isRecommended ? '#60a5fa' : '#ffffff'}
              weight={isRecommended ? 4 : 2}
              eventHandlers={{ click: () => onSelectStation(station) }}
              className={isRecommended ? 'animate-pulse' : ''}
            >
              <Popup className="custom-popup">
                <div className="text-slate-900 min-w-[150px]">
                  <h3 className="font-bold text-base mb-1">{station.name}</h3>
                  <div className="flex flex-col gap-1 text-sm">
                    <p><strong>Fuel:</strong> {station.fuel_status}</p>
                    <p><strong>Queue:</strong> {station.queue_status}</p>
                    <p><strong>Wait:</strong> ~{station.estimated_wait} min</p>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
