import { useState } from "react";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { Select } from "../components/select";
import useGlobalStore from "../infra/store";
import { getCountrybyYear } from "../infra/actions/getCountryByYear";


const Question_7 = () => {
    const { loading, years, setData, setLoading } = useGlobalStore();

    const [form, setForm] = useState({
        year: "",
    });

    const handleQ7 = async () => {
        setLoading(true);

        try {
            const data_1 = await getCountrybyYear("Global", Number(form.year) - 1);
            if (data_1.length === 0) throw Error("Error")
            const data_2 = await getCountrybyYear("Global", Number(form.year));
            if (data_2.length === 0) throw Error("Error")
            setData({
                type: "7",
                value: [data_1[0], data_2[0]]
            });

        } catch (err) {
            setData({
                type: "error",
                value: null
            });
        }
        setLoading(false);
    }
    return (
        <Card>
            <div className="w-full flex flex-col justify-center gap-4">
                <p className="text-md font-semibold text-gray-700 text-center">
                    As fontes de emissão de CO2 que tiveram o maior aumento
                    percentual em relação a seu ano anterior.
                </p>

                <Select
                    label="No ano:"
                    onChange={(ev) => {
                        setForm({
                            year: ev.target.value
                        });
                    }}
                >
                    <option>Insira o ano</option>
                    {years.map((year) => {
                        return <option key={`q7-${year}`} value={year}>{year}</option>;
                    })}
                </Select>
            </div>

            <Button disabled={loading} onClick={handleQ7}>
                Buscar
            </Button>
        </Card>
    )
}

export default Question_7;