import React from 'react';
import PumpCard from './PumpCard';

const RecommendedPump = ({ station, onNavigate }) => {
  if (!station) return null;

  return (
    <div className="mb-6 animate-fade-in relative">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur opacity-30 animate-pulse"></div>
      <div className="relative">
        <PumpCard station={station} isRecommended={true} />
        <div className="mt-2 bg-slate-800/80 p-3 rounded-lg border border-slate-700">
          <p className="text-sm text-blue-300 font-medium">💡 Why this pump?</p>
          <p className="text-sm text-slate-400 mt-1">{station.reason}</p>
          <button 
            onClick={onNavigate}
            className="mt-3 w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-lg transition-colors flex justify-center items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Navigate ({station.distance_km} km)
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedPump;
