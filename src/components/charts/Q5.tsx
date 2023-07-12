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
  quant: number;
}

export const Q5 = ({ data, quant }: MostCommonFontsProps) => {
    console.log(data)
  const mapped = data.countries.map((item) => {
    return {
      name: item.country,
      "Emissão de CO2": item.coal + item.gas + item.flaring + item.cement + item.oil,
    };
  }).sort(((a,b) => {
        return b["Emissão de CO2"] - a["Emissão de CO2"]
  })).slice(1, quant+1);

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
      <Bar dataKey={"Emissão de CO2"} fill={generateRandomColor()} />;
      {/* {mapped.map((item, i) => {
        return <Bar dataKey={"Emissão de CO2"} fill={generateRandomColor()} />;
      })} */}
    </BarChart>
  );
};
