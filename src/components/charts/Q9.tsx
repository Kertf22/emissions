import { useRef } from "react";
import {
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from "recharts";
import { generateRandomColor } from "../../services/generateColor";
interface Data {
    country: string;
    coal: number;
    gas: number;
    flaring: number;
    cement: number;
    oil: number;
    total: number;
}

interface MostCommonFontsProps {
    data: Data[]
}

export const Q9 = ({ data }: MostCommonFontsProps) => {
    console.log(data)

    const mapped: any[] = [];

    for (const key of Object.keys(data[0])) {
        if (key === "country") {
            continue
        }

        const emisssao_1 = data[0][key as keyof Data];
        const emisssao_2 = data[1][key as keyof Data];
        const diff = Number(emisssao_1) - Number(emisssao_2)
        if (diff > 0) {
            mapped.push({
                name: key,
                "Redução": diff,
                "Emissão Passada": emisssao_1,
                "Emissão do Ano": emisssao_2,
            })
        } 
    }

    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    return (
        <>
        <BarChart
            style={{ left: "-10px" }}
            width={windowSize.current[0] > 480 ? 480 : windowSize.current[0]}
            height={250}
            data={mapped}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={"Redução"} fill={generateRandomColor()} />;
            <Bar dataKey={"Emissão Passada"} fill={generateRandomColor()} />;
            <Bar dataKey={"Emissão do Ano"} fill={generateRandomColor()} />;
        </BarChart>
        <p className="text-sm text-gray-500"> Caso o gráfico esteja vazio, não houve redução naquele ano.</p>

        </>
        
    );
};
