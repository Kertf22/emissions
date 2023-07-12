import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { useRef } from "react";

interface TotalByCountryProps {
  data: {
    country: string;
    coal: number;
    gas: number;
    flaring: number;
    cement: number;
    oil: number;
  }[];
}

const TotalByCountry = ({ data }: TotalByCountryProps) => {
  console.log(data);
  const mapped = data.map((item) => {
    return {
      name: item.country,
      "Emissão de CO2": item.coal + item.gas + item.flaring + item.cement + item.oil,
    };
  });
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  return (
    <BarChart
      width={windowSize.current[0] > 480 ? 480 : windowSize.current[0]}
      height={250}
      data={mapped}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="Emissão de CO2" fill="#82ca9d" />
    </BarChart>
  );
};

export default TotalByCountry;
