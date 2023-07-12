import api from "../services/api";


export const getCountries = async () => {
  const { data } = await api.get<{country: string;}[]>("/country");
  return data;
};
