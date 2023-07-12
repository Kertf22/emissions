import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

import TotalEmissionsByCountry from "../../types/TotalEmissionsByCountry";

interface TotalByCountryProps {
  data: TotalEmissionsByCountry;
}

const TotalByCountry = ({data}: TotalByCountryProps) => {

  const mapped = data.map((item) => {
    return {
      name: item.country,
      "Emissão de CO2": item.total,
    };
  })

    return (
        <BarChart width={730} height={250} data={mapped}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Emissão de CO2" fill="#82ca9d" />
      </BarChart>
    )
};


export default TotalByCountry;