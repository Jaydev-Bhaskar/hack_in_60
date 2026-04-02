import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

let currentRole = 'user';
let currentStationId = '';

export const setApiHeaders = (role, stationId) => {
  currentRole = role;
  currentStationId = stationId;
};

// Add interceptor to inject RBAC headers
API.interceptors.request.use(config => {
  config.headers['x-role'] = currentRole;
  if (currentRole === 'operator' && currentStationId) {
    config.headers['x-station-id'] = currentStationId;
  }
  return config;
});

export const getStations = async () => API.get("/stations");
export const getRecommendation = async (lat, lng) =>
  API.get(`/recommendation?lat=${lat}&lng=${lng}`);
export const updateStatus = async (data) => API.post("/update-status", data);
export const createStation = async (data) => API.post("/stations", data);
export const deleteStation = async (id) => API.delete(`/stations/${id}`);
