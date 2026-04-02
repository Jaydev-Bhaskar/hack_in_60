import React, { useState } from 'react';
import { updateStatus } from '../services/api';

const OperatorDashboard = ({ station, onRefresh }) => {
  const [loading, setLoading] = useState(false);

  if (!station) {
    return (
      <div className="p-8 w-full h-full flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-slate-400">Please select your pump from the top navigation block.</h2>
      </div>
    );
  }

  const handleUpdate = async (type, val) => {
    setLoading(true);
    try {
      const payload = {
        station_id: station._id,
        updated_by: "pump_operator",
        fuel_status: type === 'fuel' ? val : station.fuel_status,
        queue_status: type === 'queue' ? val : station.queue_status
      };
      await updateStatus(payload);
      onRefresh();
    } catch (e) {
      alert("Failed to update status. Make sure backend is live.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-full p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl bg-slate-800 rounded-3xl p-8 border border-slate-700 shadow-2xl">
        <h1 className="text-3xl font-black text-slate-100 mb-2">{station.name}</h1>
        <p className="text-slate-400 mb-8">{station.address}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Fuel Status Box */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-slate-200 mb-4">Fuel Availability</h3>
            <div className="flex flex-col gap-3">
              {['Available', 'Low', 'Out of Stock'].map(status => (
                <button
                  key={status}
                  onClick={() => handleUpdate('fuel', status)}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold transition-all border ${
                    station.fuel_status === status
                      ? (status === 'Available' ? 'bg-green-500/20 text-green-400 border-green-500' :
                        status === 'Low' ? 'bg-orange-500/20 text-orange-400 border-orange-500' :
                        'bg-red-500/20 text-red-400 border-red-500')
                      : 'bg-slate-800 text-slate-400 border-slate-600 hover:bg-slate-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Queue Status Box */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
            <h3 className="text-xl font-bold text-slate-200 mb-4">Queue Congestion</h3>
            <div className="flex flex-col gap-3">
              {['Short', 'Medium', 'Long'].map(status => (
                <button
                  key={status}
                  onClick={() => handleUpdate('queue', status)}
                  disabled={loading}
                  className={`w-full py-4 rounded-xl font-bold transition-all border ${
                    station.queue_status === status
                      ? (status === 'Short' ? 'bg-green-500/20 text-green-400 border-green-500' :
                        status === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' :
                        'bg-red-500/20 text-red-400 border-red-500')
                      : 'bg-slate-800 text-slate-400 border-slate-600 hover:bg-slate-700'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          Last updated: {new Date(station.last_updated).toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;
