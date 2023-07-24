import { Button } from "../components/button";
import { Card } from "../components/card";
import { Select } from "../components/select";
import { getMostCommonFonts } from "../infra/actions/getMostCommonFonts";
import useGlobalStore from "../infra/store";
import { useState } from "react";

export const Question_3 = () => {

    const { loading, totalFonts, setData, setLoading } = useGlobalStore();

    const [form, setForm] = useState({
        quant: "",
    });
    
    const handleQuestion = async () => {
        setLoading(true);

        try {
            const data = await getMostCommonFonts(Number(form.quant));
            if (data.length === 0) throw Error("Error");
            setData({
                value: data,
                type: "3"
            });
        } catch (err) {
            setData({
                type: "error",
                value: null
            })
        }
        setLoading(false);
    }

    return (
        <Card>
            <div className="w-full flex flex-col justify-center gap-4">
                <p className="text-md font-semibold text-gray-700 text-center">
                    Fontes mais comuns de emissão de CO2
                </p>

                <Select
                    label="Quantidade de fontes:"
                    onChange={(ev) => {
                        setForm({
                            quant: ev.target.value
                        })
                    }}
                >
                    <option>Selecione a quantidade</option>
                    {totalFonts.map((font) => {
                        return <option key={`q3-${font}`}  value={font}>{font}</option>;
                    })}
                </Select>
            </div>
            <Button disabled={loading} onClick={handleQuestion}>
                Buscar
            </Button>
        </Card>
    )
}