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
        year: 2018,
        countries: {
            country: string;
            coal: number;
            gas: number;
            flaring: number;
            cement: number;
            oil: number;
            total: number;
        }[]
    };
}

export const Q6 = ({ data }: MostCommonFontsProps) => {
    const mapped = Object.entries(data)
        .map(([key, value]) => {
            return { name: key, [key]: value };
        })
        .slice(0, 1);
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

            {mapped.map((item) => {
                return <Bar dataKey={item.name} fill={generateRandomColor()} />;
            })}
        </BarChart>
    );
};
