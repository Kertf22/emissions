/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseChart from "./components/charts/TotalByCountry";
import ByStartYearAndCountry from "./components/charts/ByStartYearAndCountry";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import _ from "lodash";
import Spinner from "./components/spinner";
import "./App.css";
import { Card } from "./components/card";
import { Button } from "./components/button";
import { Select } from "./components/select";
import { useCountries } from "./hooks/useCountries";
import { MostCommonFonts } from "./components/charts/MostCommonFonts";
import { getCountryInfo } from "./actions/getCountryInfo";
import { getCountrybyYear } from "./actions/getCountryByYear";
import { Modal } from "./components/modal";
import { getContriesInfo } from "./actions/getCountriesInfo";
import CountriesCo2PerCapita from "./components/charts/CountriesCo2PerCapita";
import { getCountriesInfoByYear } from "./actions/getCountriesInfoByYear";
import { Q5 } from "./components/charts/Q5";
import { WarningCircle } from "@phosphor-icons/react";
import { Q6 } from "./components/charts/Q6";
import { Q7 } from "./components/charts/Q7";
import { getMostCommonFonts } from "./actions/getMostCommonFonts";
import { Q3 } from "./components/charts/Q3";
import { getAverageEmissionsByCountryAndYear } from "./actions/getAverageEmissionsByCountryAndYear";
import { Q8 } from "./components/charts/Q8";
import { Q9 } from "./components/charts/Q9";

function App() {
  const [chart, setChart] = useState("total-by-country");

  const [data, setData] = useState<any>(null);

  const handleClose = () => setData(null);

  const [loading, setLoading] = useState(false);

  const availableYears = _.range(2021, 1749, -1);

  const totalFonts = _.range(1, 6);

  const { countries } = useCountries(setLoading);

  const [q1Form, setQ1Form] = useState({
    country: "",
    year: "",
  });
  const [q2Form, setQ2Form] = useState({
    country: "",
    quant: "",
  });

  const [q3Form, setQ3Form] = useState({
    quant: "",
  });
  const [q4Form, setQ4Form] = useState({
    quant: "",
  });
  const [q5Form, setQ5Form] = useState({
    quant: "",
    year: "",
  });

  const [q7Form, setQ7Form] = useState({
    year: "",
  })

  const [q8Form, setQ8Form] = useState({
    year: "",
    country: ""
  })
  const [q9Form, setQ9Form] = useState({
    year: "",
  })


  const handleTotalEmissoes = async () => {
    setLoading(true);
    try {
      const data = await getCountrybyYear(q1Form.country, Number(q1Form.year));
      if (data.length === 0) throw Error("Error")
      setData([data[0]]);
      setChart("q1");
    } catch (err) {
      setData("error");
      setChart("error")
    }
    setLoading(false);
  };

  const handleMostFonts = async () => {
    setLoading(true);

    try {
      const data = await getCountryInfo(q2Form.country);
      if (data.length === 0) throw Error("Error")
      setData(data[0]);
      setChart("q2");
    } catch (err) {
      setData("error");
      setChart("error")
    }
    setLoading(false);
  };

  const handleQ3 = async () => {
    setLoading(true);

    try {
      const data = await getMostCommonFonts(Number(q3Form.quant));
      if (data.length === 0) throw Error("Error")
      setData(data);
      setChart("q3");
    } catch (err) {
      setData("error");
      setChart("error")
    }
    setLoading(false);
  }
  // const handleCommonEmissionFonts = async () => { };

  const handleCo2PerCapita = async () => {
    setLoading(true);

    try {
      const data = await getContriesInfo(Number(q4Form.quant));
      if (data.length === 0) throw Error("Error")
      setData(data);
      setChart("q4");
    } catch (err) {
      setData("error");
      setChart("error")
    }
    setLoading(false);
  };

  const handleMostEmissionsCo2PerYear = async () => {
    setLoading(true);

    try {
      const data = await getCountriesInfoByYear(Number(q5Form.year) - 1);
      if (data.length === 0) throw Error("Error")
      setData(data[1]);
      setChart("q5");
    } catch (err) {
      setData("error");
      setChart("error")
    }
    setLoading(false);
  };

  const handleQ6 = async () => {
    setLoading(true);

    try {
      const data = await getCountryInfo("global");

      if (data.length === 0) throw Error("Error")
      setData(data[0]);
      setChart("q6");
    } catch (err) {
      setData("error");
      setChart("error")
    }
    setLoading(false);

  }

  const handleQ7 = async () => {
    setLoading(true);

    try {
      const data_1 = await getCountrybyYear("Global", Number(q7Form.year) - 1);
      if (data_1.length === 0) throw Error("Error")
      const data_2 = await getCountrybyYear("Global", Number(q7Form.year));
      if (data_2.length === 0) throw Error("Error")
      setData([data_1[0], data_2[0]]);
      setChart("q7");
    } catch (err) {
      setData("error");
      setChart("error")
    }
    setLoading(false);
  }

  const handleQ8 = async () => {
    setLoading(true);
    try {
      const data = await getAverageEmissionsByCountryAndYear(q8Form.country, Number(q8Form.year));

      if (data.length === 0) { throw new Error("error") }
      setData({
        media_emissao: data[0].media_emissao,
        country: q8Form.country
      })
      setChart("q8");
    } catch (err) {
      setData("error");
      setChart("error")
    }
    setLoading(false);
  }

  const handleQ9 = async () => {
    setLoading(true);
    try {
      const data_1 = await getCountrybyYear("Global", Number(q9Form.year) - 1);
      if (data_1.length === 0) throw Error("Error")
      const data_2 = await getCountrybyYear("Global", Number(q9Form.year));
      if (data_2.length === 0) throw Error("Error")
      setData([data_1[0], data_2[0]]);
      setChart("q9");
    } catch (err) {
      setData("error");
      setChart("error")
    }
    setLoading(false);
  }

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center py-24">

        <p className="text-3xl font-bold">Emissões de CO2</p>

        <div className="w-full  items-center  p-12 gap-10 flex flex-wrap h-full">
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
                {availableYears.map((year) => {
                  return <option value={year}>{year}</option>;
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
                {countries.map((country: any) => {
                  return (
                    <option value={country.country}>{country.country}</option>
                  );
                })}
              </Select>
            </div>

            <Button disabled={loading} onClick={handleTotalEmissoes}>Buscar</Button>
          </Card>

          <Card>
            <div className="w-full flex flex-col justify-start gap-4">
              <p className="text-md font-semibold text-gray-700 text-center">
                Principais fontes de emissão
              </p>

              <Select
                label="Quantidade de fontes:"
                onChange={(ev) =>
                  setQ2Form({
                    ...q2Form,
                    quant: ev.target.value,
                  })
                }
              >
                <option>Selecione a quantidade</option>
                {totalFonts.map((font) => (
                  <option value={font}>{font}</option>
                ))}
              </Select>
              <Select
                label="No país:"
                onChange={(ev) =>
                  setQ2Form({
                    ...q2Form,
                    country: ev.target.value,
                  })
                }
              >
                <option>Selecione um país</option>
                {countries.map((country) => (
                  <option value={country.country}>{country.country}</option>
                ))}
              </Select>
            </div>
            <Button disabled={loading} onClick={handleMostFonts}>Buscar</Button>
          </Card>
          <Card>
            <div className="w-full flex flex-col justify-center gap-4">
              <p className="text-md font-semibold text-gray-700 text-center">
                Fontes mais comuns de emissão de CO2
              </p>

              <Select
                label="Quantidade de fontes:"
                onChange={(ev) => {
                  setQ3Form({
                    quant: ev.target.value
                  })
                }}
              >
                <option>Selecione a quantidade</option>
                {totalFonts.map((font) => {
                  return <option value={font}>{font}</option>;
                })}
              </Select>
            </div>
            <Button disabled={loading} onClick={handleQ3}>
              Buscar
            </Button>
          </Card>

          <Card>
            <div className="w-full flex flex-col justify-center gap-4">
              <p className="text-md font-semibold text-gray-700 text-center">
                Principais países em emissão de CO2 per capita
              </p>
              <Select
                label="Quantidade de países:"
                onChange={(ev) => {
                  setQ4Form({
                    ...q4Form,
                    quant: ev.target.value,
                  });
                }}
              >
                <option>Selecione a quantidade</option>
                {countries.map((_country: any, index: number) => {
                  return <option value={index + 1}>{index + 1}</option>;
                })}
              </Select>
            </div>

            <Button disabled={loading} onClick={handleCo2PerCapita}>Buscar</Button>
          </Card>

          <Card>
            <div className="w-full flex flex-col justify-center gap-4">
              <p className="text-md font-semibold text-gray-700 text-center">
                Países com maiores emissões de CO2 totais no ano
              </p>
              <Select
                label="Quantidade de países:"
                onChange={(ev) => {
                  setQ5Form({
                    ...q5Form,
                    quant: ev.target.value,
                  });
                }}
              >
                <option>Selecione a quantidade</option>
                {countries.map((_country: any, index: number) => {
                  return <option value={index + 1}>{index + 1}</option>;
                })}
              </Select>
              <Select
                label="No ano:"
                onChange={(ev) => {
                  setQ5Form({
                    ...q5Form,
                    year: ev.target.value,
                  });
                }}
              >
                <option>Selecione o ano</option>
                {availableYears.map((year) => {
                  return <option value={year}>{year}</option>;
                })}
              </Select>
              <Button disabled={loading} onClick={handleMostEmissionsCo2PerYear}>Buscar</Button>
            </div>
          </Card>

          <Card>
            <div className="w-full flex flex-col justify-center gap-4">
              <p className="text-md font-semibold text-gray-700 text-center">
                Fonte responsável pela maior emissão de CO2 mundial
              </p>

            </div>
            <Button disabled={loading} onClick={handleQ6}>
              Buscar
            </Button>
          </Card>


          <Card>
            <div className="w-full flex flex-col justify-center gap-4">
              <p className="text-md font-semibold text-gray-700 text-center">
                As fontes de emissão de CO2 que tiveram o maior aumento
                percentual em relação a seu ano anterior.
              </p>

              <Select
                label="No ano:"
                onChange={(ev) => {
                  setQ7Form({
                    year: ev.target.value
                  });
                }}
              >
                <option>Insira o ano</option>
                {availableYears.map((year) => {
                  return <option value={year}>{year}</option>;
                })}
              </Select>
            </div>

            <Button disabled={loading} onClick={handleQ7}>
              Buscar
            </Button>
          </Card>
          <Card>
            <div className="w-full flex flex-col justify-center gap-4">
              <p className="text-md font-semibold text-gray-700 text-center">
                Média de emissão de CO2 de um páis nos últimos "x" anos?
              </p>
              <Select
                label="No país:"
                onChange={(ev) => {
                  setQ8Form({
                    ...q8Form,
                    country: ev.target.value,
                  });
                }}
              >
                <option>Insira o país</option>
                {countries.map((country: any) => {
                  return (
                    <option value={country.country}>{country.country}</option>
                  );
                })}
              </Select>
              <Select
                label="No ano:"
                onChange={(ev) => {
                  setQ8Form({
                    ...q8Form,
                    year: ev.target.value
                  });
                }}
              >
                <option>Insira o ano</option>
                {availableYears.map((year) => {
                  return <option value={year}>{year}</option>;
                })}
              </Select>
            </div>

            <Button disabled={loading} onClick={handleQ8}>
              Buscar
            </Button>
          </Card>
          <Card>
            <div className="w-full flex flex-col justify-center gap-4">
              <p className="text-md font-semibold text-gray-700 text-center">
                As fontes de emissão de CO2 que tiveram redução em relação a seu ano anterior.
              </p>

              <Select
                label="No ano:"
                onChange={(ev) => {
                  setQ9Form({
                    year: ev.target.value
                  });
                }}
              >
                <option>Insira o ano</option>
                {availableYears.map((year) => {
                  return <option value={year}>{year}</option>;
                })}
              </Select>
            </div>

            <Button disabled={loading} onClick={handleQ9}>
              Buscar
            </Button>
          </Card>

          {/*
          <Card>
            <Card.Body
              style={{
                display: "flex",
                alignItems: "center",
                padding: "1rem",
                gap: "8px",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <h5 style={{ textAlign: "center" }}>
                A média de emissão de CO2 em
              </h5>
              <Form.Select
                onChange={(ev) => {
                  setSelectedCountry(ev.target.value);
                }}
              >
                <option>Selecione o país</option>
                {countries.map((country: any) => {
                  return (
                    <option value={country.country}>{country.country}</option>
                  );
                })}
              </Form.Select>
              <span></span>

              <Button disabled={loading} onClick={() => setChart("common-emission-fonts")}>
                Buscar
              </Button>
            </Card.Body>
          </Card> */}
        </div>
      </div>
      <Spinner show={loading} />

      {data && (
        <Modal open={!!data} closeModal={handleClose}>
          <p className="text-lg font-semibold mb-4">Resultado</p>

          {chart === "q1" && <BaseChart data={data} />}

          {chart === "by-start-year-and-country" && (
            <ByStartYearAndCountry data={data} />
          )}

          {chart === "q2" && (
            <MostCommonFonts data={data} quant={Number(q2Form.quant)} />
          )}
          {chart === "q3" && (
            <Q3 data={data} />
          )}

          {chart === "q4" && <CountriesCo2PerCapita data={data} />}
          {chart === "q5" && <Q5 data={data} quant={Number(q5Form.quant)} />}
          {chart === "q6" && <Q6 data={data} />}
          {chart === "q7" && <Q7 data={data} />}
          {chart === "q8" && <Q8 data={data} />}
          {chart === "q9" && <Q9 data={data} />}

          {chart === "error" && (
            <div className="flex flex-col items-center justify-center gap-4">
              <WarningCircle size={52} className="text-red-400" />
              <p className="text-sm font-semibold text-center mb-4 text-red-400">
                Aconteceu um erro ao buscar os dados, verifique se os campos foram preenchidos corretamente.
              </p>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <Button disabled={loading} onClick={handleClose}>Fechar</Button>
          </div>
        </Modal>
      )}


    </>
  );
}

export default App;
