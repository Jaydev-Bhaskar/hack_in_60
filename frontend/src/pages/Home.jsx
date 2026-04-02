import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MapView from '../components/MapView';
import PumpList from '../components/PumpList';
import RecommendedPump from '../components/RecommendedPump';
import UpdateModal from '../components/UpdateModal';
import { getStations, getRecommendation, updateStatus } from '../services/api';
import { mockStations } from '../data/mockStations';

const Home = () => {
  const [stations, setStations] = useState([]);
  const [recommended, setRecommended] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useLiveApi, setUseLiveApi] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    let stData = [];
    let recData = null;
    let live = false;

    // Default coordinates: Mumbai
    const mumbaLat = 19.076;
    const mumbaLng = 72.8777;

    try {
      console.log("Attempting live API...");
      const stRes = await getStations();
      stData = stRes.data.stations;
      
      const recRes = await getRecommendation(mumbaLat, mumbaLng);
      recData = recRes.data.recommended;
      
      live = true;
      console.log("✅ Connected to live API");
    } catch (err) {
      console.warn("⚠️ Live API not reachable, falling back to mock data.", err.message);
      stData = mockStations;
      
      // Simple mock recommendation logic
      const available = mockStations.filter(s => s.fuel_status !== 'Out of Stock');
      recData = available.sort((a, b) => a.estimated_wait - b.estimated_wait)[0] || null;
      if (recData) {
        recData = { 
          ...recData, 
          score: 95.5, 
          distance_km: 1.2, 
          reason: `Available fuel, ${recData.queue_status.toLowerCase()} queue, closest to you` 
        };
      }
    }

    setStations(stData);
    setRecommended(recData);
    setUseLiveApi(live);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateSubmit = async (data) => {
    try {
      if (useLiveApi) {
        await updateStatus(data);
      } else {
        console.log("Mock update submitted", data);
      }
      setShowUpdateModal(false);
      // Refresh data
      fetchData();
    } catch (err) {
      alert("Failed to submit status update.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-900">
      <Navbar />
      
      {/* Container logic: Column on mobile, Row on desktop */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden relative">
        
        {/* Map Area */}
        <div className="w-full lg:w-2/3 h-[50vh] lg:h-full relative z-0 shrink-0">
          {loading && (
            <div className="absolute inset-0 bg-slate-900/80 z-10 flex items-center justify-center backdrop-blur-sm">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-blue-400 font-medium animate-pulse">Scanning nearby pumps...</p>
              </div>
            </div>
          )}
          <MapView 
            stations={stations} 
            recommendedStation={recommended} 
            selectedStation={selectedStation}
            onSelectStation={setSelectedStation}
          />
        </div>

        {/* Sidebar Area */}
        <div className="w-full lg:w-1/3 bg-slate-900 h-[50vh] lg:h-full flex flex-col z-10 shadow-[-10px_0_20px_rgba(0,0,0,0.3)]">
          {!useLiveApi && !loading && (
            <div className="bg-yellow-500/20 border-b border-yellow-500/30 text-yellow-400 text-xs px-4 py-2 text-center">
              ⚠️ Live server offline. Using mock data.
            </div>
          )}
          
          <div className="flex-1 overflow-y-auto w-full max-h-full p-4 relative custom-scrollbar">
            <RecommendedPump 
              station={recommended} 
              onNavigate={() => setSelectedStation(recommended)} 
            />
            <PumpList 
              stations={stations} 
              onSelectStation={setSelectedStation} 
            />
          </div>
        </div>

        {/* Floating FAB */}
        <button 
          onClick={() => setShowUpdateModal(true)}
          className="absolute bottom-6 right-6 lg:right-auto lg:left-[calc(66.666%-5rem)] z-50 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-6 rounded-full shadow-xl shadow-blue-900/50 hover:scale-105 transition-all flex items-center gap-2 border border-blue-400/30"
        >
          <span className="text-xl">📝</span>
          Update Status
        </button>

      </div>

      {showUpdateModal && (
        <UpdateModal 
          stations={stations} 
          onClose={() => setShowUpdateModal(false)}
          onSubmit={handleUpdateSubmit}
        />
      )}
    </div>
  );
};

export default Home;
