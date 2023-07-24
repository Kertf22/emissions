import api from "../services/api";

interface CountrybyYear {
  coal: number;
  gas: number
  flaring: number;
  cement: number;
  oil: number;
  total: number;
  country: string;
  year:number;
}

export const getCountriesInfoByYear = async (year:number) => {
  const { data } = await api.get<CountrybyYear[]>(`/year-total/${year}`);
  return data;
};
