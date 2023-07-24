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
import { generateRandomColor } from "../../infra/services/generateColor";
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

export const Q7 = ({ data }: MostCommonFontsProps) => {
    console.log(data)

    const mapped: {
        name: string;
        Percentual: number;
    }[] = [];

    for (const key of Object.keys(data[0])) {
        if (key === "country") {
            continue
        }

        const emisssao_1 = data[0][key as keyof Data];
        const emisssao_2 = data[1][key as keyof Data];
        mapped.push({
            name: key,
            Percentual: (Number(emisssao_2) - Number(emisssao_1)) / Number(emisssao_2)
        })
    }

    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    return (
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
            <Bar dataKey={"Percentual"} fill={generateRandomColor()} />;
        </BarChart>
    );
};
