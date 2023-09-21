import api from "../services/api";
import { Location } from "../store";

export const getLocations = async ():Promise<Location[]> => {
  const { data } = await api.get<Location[]>(`/location`);
  return data;
};
