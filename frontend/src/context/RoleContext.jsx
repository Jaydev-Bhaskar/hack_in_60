import React, { createContext, useContext, useState, useEffect } from 'react';
import { setApiHeaders } from '../services/api';

const RoleContext = createContext();

export const useRole = () => useContext(RoleContext);

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('fw_role') || 'user');
  const [stationId, setStationId] = useState(localStorage.getItem('fw_station_id') || '');

  useEffect(() => {
    localStorage.setItem('fw_role', role);
    localStorage.setItem('fw_station_id', stationId);
    setApiHeaders(role, stationId);
  }, [role, stationId]);

  return (
    <RoleContext.Provider value={{ role, setRole, stationId, setStationId }}>
      {children}
    </RoleContext.Provider>
  );
};
