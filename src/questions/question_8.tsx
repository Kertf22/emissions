import { Card } from "../components/card";
import { Select } from "../components/select";
import { useState } from "react";
import useGlobalStore from "../infra/store";
import { getAverageEmissionsByCountryAndYear } from "../infra/actions/getAverageEmissionsByCountryAndYear";
import { Button } from "../components/button";
import { useQuery } from "react-query";

const Question_8 = () => {
    const { loading, countries, years, setData, setLoading } = useGlobalStore();

    const [form, setForm] = useState({
        year: "",
        country: ""
    })

    const { refetch } = useQuery({
        queryKey: "questions8",
        onSettled: () => setLoading(false),
        queryFn: async () => {
          setLoading(true);
          return await getAverageEmissionsByCountryAndYear(form.country, 2023 - Number(form.year));
        },
        cacheTime: 1000 * 60 * 60 * 24 * 14, // 2 weeks
        onSuccess: (data) => {
          if (data.length === 0 || data[0].media_emissao === 0) {
            setData({
              value: null,
              type: "error",
            });
          } else {
            setData({
                value: {
                    media_emissao: data[0].media_emissao,
                    country: form.country
                },
                type: "8"
            })
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

    const handleQ8 = async () => {
        refetch()
    }
    return (
        <Card>
            <div className="w-full flex flex-col justify-center gap-4">
                <p className="text-md font-semibold text-gray-700 text-center">
                    Média de emissão de CO2 de um páis nos últimos "x" anos?
                </p>
                <Select
                    label="No país:"
                    onChange={(ev) => {
                        setForm({
                            ...form,
                            country: ev.target.value,
                        });
                    }}
                >
                    <option>Insira o país</option>
                    {countries.map((country) => {
                        return (
                            <option key={`q8-${country}`} value={country.country}>{country.country}</option>
                        );
                    })}
                </Select>
                <Select
                    label="No ano:"
                    onChange={(ev) => {
                        setForm({
                            ...form,
                            year: ev.target.value
                        });
                    }}
                >
                    <option>Insira o ano</option>
                    {years.map((year) => {
                        return <option key={`q8-${year}`} value={year}>{year}</option>;
                    })}
                </Select>
            </div>

            <Button disabled={loading} onClick={handleQ8}>
                Buscar
            </Button>
        </Card>
    )
}

export default Question_8;