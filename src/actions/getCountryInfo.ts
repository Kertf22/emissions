import api from "../services/api";

interface CountryInfo {
  coal: number;
  gas: number
  flaring: number;
  cement: number;
  oil: number;
  total: number;
  country: string
}

export const getCountryInfo = async (country:string) => {
  const { data } = await api.get<CountryInfo[]>(`/country-info/${country}`);
  return data;
};
