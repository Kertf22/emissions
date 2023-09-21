import { useState } from "react";
import { Button } from "../components/button";
import { Card } from "../components/card";
import { Select } from "../components/select";
import useGlobalStore from "../infra/store";
import { getCountrybyYear } from "../infra/actions/getCountryByYear";
import { useQuery } from "react-query";

const Question_7 = () => {
  const { loading, years, setData, setLoading } = useGlobalStore();

  const [form, setForm] = useState({
    year: "",
  });

  const { refetch } = useQuery({
    queryKey: "questions7",
    onSettled: () => setLoading(false),
    queryFn: async () => {
      setLoading(true);
      return Promise.all([
        getCountrybyYear("Global", Number(form.year) - 1),
        getCountrybyYear("Global", Number(form.year)),
      ]);
    },
    cacheTime: 1000 * 60 * 60 * 24 * 14, // 2 weeks
    onSuccess: ([data_1, data_2]) => {
      if (data_1.length === 0 || data_2.length === 0) {
        setData({
          value: null,
          type: "error",
        });
      } else {
        setData({
          type: "7",
          value: [data_1[0], data_2[0]],
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
  const handleQ7 = async () => {
    refetch()
  };
  return (
    <Card>
      <div className="w-full flex flex-col justify-center gap-4">
        <p className="text-md font-semibold text-gray-700 text-center">
          As fontes de emissão de CO2 que tiveram o maior aumento percentual em
          relação a seu ano anterior.
        </p>

        <Select
          label="No ano:"
          onChange={(ev) => {
            setForm({
              year: ev.target.value,
            });
          }}
        >
          <option>Insira o ano</option>
          {years.map((year) => {
            return (
              <option key={`q7-${year}`} value={year}>
                {year}
              </option>
            );
          })}
        </Select>
      </div>

      <Button disabled={loading} onClick={handleQ7}>
        Buscar
      </Button>
    </Card>
  );
};

export default Question_7;
