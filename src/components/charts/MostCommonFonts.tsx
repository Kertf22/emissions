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
    coal: number;
    gas: number;
    flaring: number;
    cement: number;
    oil: number;
    total: number;
  };
  quant: number;
}

export const MostCommonFonts = ({ data, quant }: MostCommonFontsProps) => {
  const mapped = Object.entries(data)
    .map(([key, value]) => {
      return { name: key, [key]: value };
    })
    .slice(0, quant);
    console.log(MostCommonFonts)
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

      {mapped.map((item, i) => {
        return <Bar dataKey={item.name} fill={generateRandomColor()} />;
      })}
    </BarChart>
  );
};
