import api from "../services/api";


export const getMostCommonFonts = async (quant:number) => {
  const { data } = await api.get<[]>(`/fonts/most-commons?amount=${quant}`);
  return data;
};
