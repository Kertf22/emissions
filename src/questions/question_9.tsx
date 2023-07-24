import { useState } from "react";
import { Card } from "../components/card";
import { Select } from "../components/select";
import { getCountrybyYear } from "../infra/actions/getCountryByYear";
import useGlobalStore from "../infra/store";
import { Button } from "../components/button";

const Question_9 = () => {
    const { loading, years, setData, setLoading } = useGlobalStore();
    const [form, setForm] = useState({
        year: "",
    })

    const handleQ9 = async () => {
        setLoading(true);
        try {
            const data_1 = await getCountrybyYear("Global", Number(form.year) - 1);
            if (data_1.length === 0) throw Error("Error")
            const data_2 = await getCountrybyYear("Global", Number(form.year));
            if (data_2.length === 0) throw Error("Error")
            setData({
                value: [data_1[0], data_2[0]],
                type: "9",
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
                    As fontes de emissão de CO2 que tiveram redução em relação a seu ano anterior.
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
                        return <option key={`q9-${year}`} value={year}>{year}</option>;
                    })}
                </Select>
            </div>

            <Button disabled={loading} onClick={handleQ9}>
                Buscar
            </Button>
        </Card>
    )
};


export default Question_9;