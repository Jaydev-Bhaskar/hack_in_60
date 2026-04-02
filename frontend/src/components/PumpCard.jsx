import React from 'react';
import StatusBadge from './StatusBadge';

const PumpCard = ({ station, isRecommended, onClick }) => {
  return (
    <div 
      onClick={() => onClick && onClick(station)}
      className={`relative p-4 rounded-xl border bg-slate-800 transition-all cursor-pointer hover:scale-[1.02] hover:shadow-lg ${
        isRecommended 
          ? 'border-blue-500 shadow-blue-500/20 shadow-md' 
          : 'border-slate-700 hover:border-slate-600'
      }`}
    >
      {isRecommended && (
        <div className="absolute -top-3 -right-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          ⭐ Best Pick
        </div>
      )}
      
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-slate-100">{station.name}</h3>
          <p className="text-sm text-slate-400">{station.address}</p>
        </div>
        {station.score && (
          <div className="text-right">
            <span className="text-xl font-black text-blue-400">{Math.round(station.score)}</span>
            <span className="text-xs text-slate-500 block">score</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <StatusBadge type="fuel" value={station.fuel_status} />
        <StatusBadge type="queue" value={station.queue_status} />
        <span className="px-2 py-1 text-xs font-medium bg-slate-700 text-slate-300 rounded-full inline-flex items-center gap-1">
           Wait: ~{station.estimated_wait} min
        </span>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex gap-1 text-xs text-slate-500">
          {station.fuel_types?.map(ft => (
            <span key={ft} className="px-1.5 py-0.5 bg-slate-700/50 rounded">{ft}</span>
          ))}
        </div>
        <span className="text-xs text-slate-500">
          Last updated: {new Date(station.last_updated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default PumpCard;
