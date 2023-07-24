import EmissionsByStartYearAndCountry from "../../infra/types/EmissionsByStartYearAndCountry";
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
  data: EmissionsByStartYearAndCountry;
}

const ByStartYearAndCountry = ({
  data,
}: EmissionsByStartYearAndCountryProps) => {
  const mapped = data.map((item) => {
    return { name: item.country, ...item };
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
      <Bar dataKey="coal" fill="#82ca9d" />
      <Bar dataKey="oil" fill="#d5f51f" />
      <Bar dataKey="gas" fill="#f21010" />
      <Bar dataKey="flaring" fill="#82ca9d" />
      <Bar dataKey="cement" fill="#82ca9d" />
      <Bar dataKey="other" fill="#82ca9d" />
    </BarChart>
  );
};

export default ByStartYearAndCountry;
