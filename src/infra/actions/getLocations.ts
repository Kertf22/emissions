import api from "../services/api";

export const getLocations = async () => {
  const { data } = await api.get<[]>(`/location`);
  return data;
};
