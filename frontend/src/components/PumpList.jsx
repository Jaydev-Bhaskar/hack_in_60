import React from 'react';
import PumpCard from './PumpCard';

const PumpList = ({ stations, onSelectStation }) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold text-slate-200 sticky top-0 bg-slate-900/90 backdrop-blur pb-2 z-10 pt-4 px-1">
        📋 Nearby Stations ({stations?.length || 0})
      </h2>
      <div className="flex flex-col gap-3 overflow-y-auto max-h-full px-1 pb-4">
        {stations.map(s => (
          <PumpCard key={s._id} station={s} onClick={onSelectStation} />
        ))}
        {stations.length === 0 && (
          <div className="text-center p-8 text-slate-500">
            No stations found nearby.
          </div>
        )}
      </div>
    </div>
  );
};

export default PumpList;
