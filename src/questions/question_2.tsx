import { useState } from "react"
import { Button } from "../components/button"
import { Card } from "../components/card"
import { Select } from "../components/select"
import useGlobalStore from "../infra/store"
import { getCountryInfo } from "../infra/actions/getCountryInfo"
import { useQuery } from "react-query"

const Question_2 = () => {
    const { countries, loading, totalFonts, setData, setLoading } = useGlobalStore();

    const [form, setForm] = useState({
        country: "",
        quant: "",
    });

    const { refetch } = useQuery({
        queryKey: "questions2",
        onSettled: () => setLoading(false),
        queryFn: async () => {
            setLoading(true);
            return await getCountryInfo(form.country);
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
                    value: {
                        data:data[0],
                        quant:Number(form.quant)
                    },
                    type: "2"
                });
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
    const handleMostFonts = async () => {
        refetch()
    };

    
    return (
        <Card >
            <div className="w-full flex flex-col justify-start gap-4">
                <p className="text-md font-semibold text-gray-700 text-center">
                    Principais fontes de emissão
                </p>

                <Select
                    label="Quantidade de fontes:"
                    onChange={(ev) =>
                        setForm({
                            ...form,
                            quant: ev.target.value,
                        })
                    }
                >
                    <option>Selecione a quantidade</option>
                    {totalFonts.map((font) => (
                        <option  key={`q2-${font}`} value={font}>{font}</option>
                    ))}
                </Select>
                <Select
                    label="No país:"
                    onChange={(ev) =>
                        setForm({
                            ...form,
                            country: ev.target.value,
                        })
                    }
                >
                    <option>Selecione um país</option>
                    {countries.map((country) => (
                        <option key={`q2-${country}`} value={country.country}>{country.country}</option>
                    ))}
                </Select>
            </div>
            <Button disabled={loading} onClick={handleMostFonts}>Buscar</Button>
        </Card>)
}

export default Question_2;