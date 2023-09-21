import { useState } from "react";
import { Select } from "../components/select";
import { Card } from "../components/card";
import useGlobalStore from "../infra/store";
import { getCountrybyYear } from "../infra/actions/getCountryByYear";
import { Button } from "../components/button";
import { useQuery } from "react-query";

const Question_1 = () => {

    const { countries, years, loading, setLoading, setData } = useGlobalStore()

    const [q1Form, setQ1Form] = useState({
        country: "",
        year: "",
    });
  // Queries
    const {refetch} = useQuery({
        queryKey: "questions1",
        onSettled: () => setLoading(false),
        queryFn: async () => {
            setLoading(true);
            return await getCountrybyYear(q1Form.country, Number(q1Form.year));
        },
            staleTime: 1000 * 60 * 60 * 24 * 14 , // 2 weeks
    cacheTime: 1000 * 60 * 60 * 24 * 14 , // 2 weeks
        onSuccess: (data) => {
            if (data.length === 0) {
                setData({
                    value: null,
                    type: "error",
                });
            } else {
                setData({
                    value: [data[0]],
                    type: "1",
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
    })
    const handleQuestion = async () => {
        refetch()
    };
    return (
        <>
            <Card>
                <div className="w-full flex flex-col justify-start gap-4">
                    <p className="text-md font-semibold text-gray-700 text-center">
                        Emissões totais
                    </p>

                    <Select
                        label="No ano:"
                        onChange={(ev) => {
                            setQ1Form({
                                ...q1Form,
                                year: ev.target.value,
                            });
                        }}
                    >
                        <option>Insira o ano</option>
                        {years.map((year) => {
                            return <option  key={`q1-${year}`} value={year}>{year}</option>;
                        })}
                    </Select>
                    <Select
                        label="No país:"
                        onChange={(ev) => {
                            setQ1Form({
                                ...q1Form,
                                country: ev.target.value,
                            });
                        }}
                    >
                        <option>Insira o país</option>
                        {countries.map((country) => {
                            return (
                                <option  key={`q1-${country}`} value={country.country}>{country.country}</option>
                            );
                        })}
                    </Select>
                </div>
                <Button disabled={loading} onClick={handleQuestion}>Buscar</Button>
            </Card>
        </>
    )
}

export default Question_1