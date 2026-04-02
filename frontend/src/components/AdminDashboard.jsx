import React, { useState } from 'react';
import { createStation, deleteStation } from '../services/api';

const AdminDashboard = ({ stations, onRefresh }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this station?")) return;
    setLoading(true);
    try {
      await deleteStation(id);
      onRefresh();
    } catch (e) {
      alert("Failed to delete. Make sure backend is running live.");
    }
    setLoading(false);
  };

  const handleAddFake = async () => {
    setLoading(true);
    try {
      await createStation({
        _id: "st_" + Math.floor(Math.random()*1000),
        name: "New Gas - " + Math.floor(Math.random()*100),
        address: "Test Location, Mumbai",
        lat: 19.1 + Math.random()*0.1,
        lng: 72.8 + Math.random()*0.1,
        brand: "Other",
        fuel_types: ["Petrol"],
        fuel_status: "Available",
        queue_status: "Short",
        estimated_wait: 0
      });
      onRefresh();
    } catch (e) {
      alert("Failed to add station. Make sure backend is running live.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 w-full h-full overflow-y-auto max-h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black text-slate-100">Admin Control Panel</h2>
        <button 
          onClick={handleAddFake}
          disabled={loading}
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          + Add Test Station
        </button>
      </div>

      <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
        <table className="w-full text-left text-slate-300">
          <thead className="bg-slate-900 border-b border-slate-700">
            <tr>
              <th className="p-4 rounded-tl-xl">ID</th>
              <th className="p-4">Name</th>
              <th className="p-4">Queue</th>
              <th className="p-4">Fuel</th>
              <th className="p-4 text-right rounded-tr-xl">Action</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((s, i) => (
              <tr key={s._id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                <td className="p-4 text-sm text-slate-500 font-mono">{s._id}</td>
                <td className="p-4 font-medium">{s.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${s.queue_status === 'Long' ? 'bg-red-500/20 text-red-400' : 'bg-slate-700 text-slate-300'}`}>
                    {s.queue_status}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${s.fuel_status === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                    {s.fuel_status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => handleDelete(s._id)}
                    disabled={loading}
                    className="text-red-400 hover:text-red-300 font-medium py-1 px-3 bg-red-500/10 hover:bg-red-500/20 rounded transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
