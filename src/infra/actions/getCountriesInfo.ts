import api from "../services/api"

export const getContriesInfo = async (quantity:number) => {
    const {data} = await api.get(`/co2-total/${quantity}/per_capita`);

    return data;
}