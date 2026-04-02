import React from 'react';
import { useRole } from '../context/RoleContext';

const Navbar = ({ stations }) => {
  const { role, setRole, stationId, setStationId } = useRole();

  return (
    <nav className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <span className="text-2xl" role="img" aria-label="Pump">🛢️</span>
        <h1 className="text-xl font-black text-white tracking-tight">Fuel<span className="text-blue-500">Wise</span></h1>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Basic RBAC Switcher for Demo */}
        <div className="flex items-center gap-2">
          <select 
            value={role} 
            onChange={e => setRole(e.target.value)}
            className="bg-slate-800 text-slate-300 text-sm rounded-lg px-2 py-1 border border-slate-700 outline-none focus:border-blue-500"
          >
            <option value="user">User View</option>
            <option value="operator">Operator View</option>
            <option value="admin">Admin View</option>
          </select>
          
          {role === 'operator' && stations?.length > 0 && (
            <select 
              value={stationId} 
              onChange={e => setStationId(e.target.value)}
              className="bg-slate-800 text-blue-300 font-medium text-sm rounded-lg px-2 py-1 border border-blue-900 outline-none focus:border-blue-500 max-w-[120px] truncate"
            >
              <option value="" disabled>Select Pump...</option>
              {stations.map(s => (
                <option key={s._id} value={s._id}>{s.name.split('-')[0]}</option>
              ))}
            </select>
          )}
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700 ml-2">
          <span>📍</span>
          <span className="text-sm font-medium text-slate-300">Mumbai</span>
        </div>
        
        {role === 'user' && (
          <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 font-bold py-1.5 px-4 rounded-full text-sm transition-colors flex items-center gap-2">
            <span className="animate-pulse">🚨</span>
            <span className="hidden sm:inline">Emergency</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
