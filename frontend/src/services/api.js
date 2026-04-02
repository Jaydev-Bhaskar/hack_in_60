import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const getStations = async () => API.get("/stations");
export const getRecommendation = async (lat, lng) =>
  API.get(`/recommendation?lat=${lat}&lng=${lng}`);
export const updateStatus = async (data) => API.post("/update-status", data);
