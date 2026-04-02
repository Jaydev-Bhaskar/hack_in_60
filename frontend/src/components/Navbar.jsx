import React from 'react';

const Navbar = () => {
  return (
    <nav className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <span className="text-2xl" role="img" aria-label="Pump">🛢️</span>
        <h1 className="text-xl font-black text-white tracking-tight">Fuel<span className="text-blue-500">Wise</span></h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
          <span>📍</span>
          <span className="text-sm font-medium text-slate-300">Mumbai</span>
        </div>
        
        <button className="bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 font-bold py-1.5 px-4 rounded-full text-sm transition-colors flex items-center gap-2">
          <span className="animate-pulse">🚨</span>
          <span className="hidden sm:inline">Emergency</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
