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

export const getCountrybyYear = async (country:string,year:number) => {
  const { data } = await api.get<CountrybyYear[]>(`/country/${country}/${year}`);
  return data;
};
