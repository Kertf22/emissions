import { useQuery } from "react-query";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { Select } from "../components/select";
import { getContriesInfo } from "../infra/actions/getCountriesInfo";
import useGlobalStore from "../infra/store";
import { useState } from "react";

export const Question_4 = () => {

    const { loading, countries, setData, setLoading } = useGlobalStore();

    const [form, setForm] = useState({
        quant: "",
    });

    const {refetch} = useQuery({
        queryKey: "questions4",
        onSettled: () => setLoading(false),
        queryFn: async () => {
            setLoading(true);
            return await getContriesInfo(Number(form.quant))
        },
            staleTime: 1000 * 60 * 60 * 24 * 14 , // 2 weeks
    cacheTime: 1000 * 60 * 60 * 24 * 14 , // 2 weeks
        onSuccess: (data) => {
            if (data.length === 0) {
                setData({
                    value: null,
                    type: "error",
                });
            } else {
                setData({
                    type: "4",
                    value: data
                })
            }
        },
        onError: () => {
            setData({
                value: null,
                type: "error",
            });
        },
        enabled: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })

    const handleQuestion = async () => {
        refetch()
    }

    return (
        <Card>
            <div className="w-full flex flex-col justify-center gap-4">
                <p className="text-md font-semibold text-gray-700 text-center">
                    Principais países em emissão de CO2 per capita
                </p>
                <Select
                    label="Quantidade de países:"
                    onChange={(ev) => {
                        setForm({
                            ...form,
                            quant: ev.target.value,
                        });
                    }}
                >
                    <option>Selecione a quantidade</option>
                    {countries.map((_country, index: number) => {
                        return <option key={`q4-${index}`} value={index + 1}>{index + 1}</option>;
                    })}
                </Select>
            </div>

            <Button disabled={loading} onClick={handleQuestion}>Buscar</Button>
        </Card>
    )
}