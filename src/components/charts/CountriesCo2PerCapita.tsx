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
interface EmissionsByStartYearAndCountryProps {
  data: {
    country: string;
    per_capita: number;
    total: number;
  }[];
}

const CountriesCo2PerCapita = ({
  data,
}: EmissionsByStartYearAndCountryProps) => {
  const mapped = data.map((item) => {
    return { name: item.country, per_capita: item.per_capita };
  });

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
      <Bar dataKey="per_capita" fill="#850000" />
    </BarChart>
  );
};

export default CountriesCo2PerCapita;
