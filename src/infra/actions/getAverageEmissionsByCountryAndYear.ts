import api from "../services/api";


export const getAverageEmissionsByCountryAndYear = async (country: string, year: number) => {
  const { data } = await api.get<{media_emissao:number}[]>(`/emissions/average?country=${country}&lastYears=${year}`);
  return data;
};
