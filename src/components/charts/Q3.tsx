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

interface Q3Props {
    data: {
        fonte: string;
        total_registros_fonte: number;
    }[]
}

export const Q3 = ({ data }: Q3Props) => {
    const mapped = data
        .map((d) => {
            return { name: d.fonte, "Total de Registros": d.total_registros_fonte };
        })

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
            <Bar dataKey={"Total de Registros"} fill={generateRandomColor()} />
        </BarChart>
    );
};
