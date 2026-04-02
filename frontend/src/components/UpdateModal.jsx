import React, { useState } from 'react';

const UpdateModal = ({ stations, onClose, onSubmit }) => {
  const [stationId, setStationId] = useState('');
  const [fuelStatus, setFuelStatus] = useState('Available');
  const [queueStatus, setQueueStatus] = useState('Medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stationId) return alert('Please select a station');
    
    setIsSubmitting(true);
    await onSubmit({
      station_id: stationId,
      fuel_status: fuelStatus,
      queue_status: queueStatus,
      updated_by: 'anonymous'
    });
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-slate-800 rounded-2xl w-full max-w-md border border-slate-700 shadow-2xl p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">📝 Report Status</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Station</label>
            <select 
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
              value={stationId}
              onChange={e => setStationId(e.target.value)}
              required
            >
              <option value="" disabled>Select a petrol pump...</option>
              {stations.map(s => (
                <option key={s._id} value={s._id}>{s.name} ({s.brand})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Fuel Availability</label>
            <div className="grid grid-cols-3 gap-2">
              {['Available', 'Low', 'Out of Stock'].map(status => (
                <label 
                  key={status} 
                  className={`cursor-pointer text-center py-2 px-1 rounded border text-sm font-medium transition-colors ${
                    fuelStatus === status 
                      ? status === 'Available' ? 'bg-green-500/20 border-green-500 text-green-400'
                      : status === 'Low' ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                      : 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="fuel" 
                    value={status}
                    checked={fuelStatus === status}
                    onChange={() => setFuelStatus(status)}
                    className="hidden" 
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Queue Length</label>
            <div className="grid grid-cols-3 gap-2">
              {['Short', 'Medium', 'Long'].map(status => (
                <label 
                  key={status} 
                  className={`cursor-pointer text-center py-2 px-1 rounded border text-sm font-medium transition-colors ${
                    queueStatus === status 
                      ? status === 'Short' ? 'bg-green-500/20 border-green-500 text-green-400'
                      : status === 'Medium' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
                      : 'bg-red-500/20 border-red-500 text-red-400'
                      : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <input 
                    type="radio" 
                    name="queue" 
                    value={status}
                    checked={queueStatus === status}
                    onChange={() => setQueueStatus(status)}
                    className="hidden" 
                  />
                  {status}
                </label>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || !stationId}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3 px-4 rounded-lg transition-colors mt-8"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateModal;
