import { useQuery } from "react-query";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { Select } from "../components/select";
import { getCountriesInfoByYear } from "../infra/actions/getCountriesInfoByYear";
import useGlobalStore from "../infra/store";
import { useState } from "react";

export const Question_5 = () => {
  const { loading, years, countries, setData, setLoading } = useGlobalStore();

  const [form, setForm] = useState({
    quant: "",
    year: "",
  });

  const { refetch } = useQuery({
    queryKey: "questions5",
    onSettled: () => setLoading(false),
    queryFn: async () => {
      setLoading(true);
      return await getCountriesInfoByYear(Number(form.year) - 1);
    },
    cacheTime: 1000 * 60 * 60 * 24 * 14, // 2 weeks
    onSuccess: (data) => {
      if (data.length === 0) {
        setData({
          value: null,
          type: "error",
        });
      } else {
        setData({
          value: {
            data: data[1],
            quant: Number(form.quant),
          },
          type: "5",
        });
      }
    },
    onError: () => {
      setData({
        value: null,
        type: "error",
      });
    },
    enabled: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const handleMostEmissionsCo2PerYear = async () => {
   refetch()
  };

  return (
    <Card>
      <div className="w-full flex flex-col justify-center gap-4">
        <p className="text-md font-semibold text-gray-700 text-center">
          Países com maiores emissões de CO2 totais no ano
        </p>
        <Select
          label="Quantidade de países:"
          onChange={(ev) => {
            setForm({
              ...form,
              quant: ev.target.value,
            });
          }}
        >
          <option>Selecione a quantidade</option>
          {countries.map((_country, index: number) => {
            return (
              <option key={`q5-${index}`} value={index + 1}>
                {index + 1}
              </option>
            );
          })}
        </Select>
        <Select
          label="No ano:"
          onChange={(ev) => {
            setForm({
              ...form,
              year: ev.target.value,
            });
          }}
        >
          <option>Selecione o ano</option>
          {years.map((year) => {
            return (
              <option key={`q5-${year}`} value={year}>
                {year}
              </option>
            );
          })}
        </Select>
        <Button disabled={loading} onClick={handleMostEmissionsCo2PerYear}>
          Buscar
        </Button>
      </div>
    </Card>
  );
};
