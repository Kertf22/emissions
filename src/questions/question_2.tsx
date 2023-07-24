import { useState } from "react"
import { Button } from "../components/button"
import { Card } from "../components/card"
import { Select } from "../components/select"
import useGlobalStore from "../infra/store"
import { getCountryInfo } from "../infra/actions/getCountryInfo"

const Question_2 = () => {
    const { countries, loading, totalFonts, setData, setLoading } = useGlobalStore();

    const [form, setForm] = useState({
        country: "",
        quant: "",
    });

    const handleMostFonts = async () => {
        setLoading(true);
        try {
            const data = await getCountryInfo(form.country);
            if (data.length === 0) throw Error("Error")
            setData({
                value: {
                    data:data[0],
                    quant:Number(form.quant)
                },
                type: "2"
            });
        } catch (err) {
            setData({
                value: null,
                type: "error"
            });
        }
        setLoading(false);
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