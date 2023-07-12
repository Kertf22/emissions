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

interface MostCommonFontsProps {
    data: {
        country: string;
        media_emissao: number;
    }
}

export const Q8 = ({ data }: MostCommonFontsProps) => {
    const mapped = [{
        name: data.country,
        "Media de Emissão": data.media_emissao
    }]
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
            <Bar dataKey={"Media de Emissão"} fill={generateRandomColor()} />
  
        </BarChart>
    );
};
