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

  const [q4Form, setQ4Form] = useState({
    quant: "",
  });
  const [q5Form, setQ5Form] = useState({
    quant: "",
    year: "",
  });

  const handleTotalEmissoes = async () => {
    setLoading(true);
    try {
      const data = await getCountrybyYear(q1Form.country, q1Form.year);
      if (data.length === 0) return null;
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
      if (data.length === 0) return null;
      setData(data[0]);
      setChart("q2");
    } catch (err) {
      setData("error");
      setChart("error")
    }
    setLoading(false);
  };

  const handleCommonEmissionFonts = async () => {};

  const handleCo2PerCapita = async () => {
    setLoading(true);

    try {
      const data = await getContriesInfo(Number(q4Form.quant));
      if (data.length === 0) return null;
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
      if (data.length === 0) return null;
      setData(data[1]);
      setChart("q5");
    } catch (err) {
      setData("error");
      setChart("error")
    }
    setLoading(false);
  };

  return (
    <>
      <div className="w-full h-full flex flex-col items-center justify-center py-24">
        <Spinner show={loading} />

        <p className="text-2xl font-bold">Emissões de CO2</p>

        <div className="w-full  items-center  p-12 gap-10 flex flex-wrap h-full">
          <Card>
            <div className="w-full flex flex-col justify-start gap-4">
              <p className="text-lg font-semibold text-gray-800 text-center">
                Emissões totais
              </p>

              <Select
                label="No ano"
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
                label="No país"
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

            <Button onClick={handleTotalEmissoes}>Buscar</Button>
          </Card>

          <Card>
            <div className="w-full flex flex-col justify-start gap-4">
              <p className="text-lg font-semibold text-gray-800 text-center">
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
                label="No país"
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
            <Button onClick={handleMostFonts}>Buscar</Button>
          </Card>
          <Card>
            <div className="w-full flex flex-col justify-center gap-4">
              <p className="text-lg font-semibold text-gray-800 text-center">
                Fontes mais comuns de emissão de CO2
              </p>

              <Select
                label="Quantidade de fontes:"
                onChange={(ev) => {
                  // setSelectedAmountFonts(ev.target.value);
                }}
              >
                <option>Selecione a quantidade</option>
                {totalFonts.map((font) => {
                  return <option value={font}>{font}</option>;
                })}
              </Select>
            </div>
            <Button onClick={() => setChart("common-emission-fonts")}>
              Buscar
            </Button>
          </Card>

          <Card>
            <div className="w-full flex flex-col justify-center gap-4">
              <p className="text-lg font-semibold text-gray-800 text-center">
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

            <Button onClick={handleCo2PerCapita}>Buscar</Button>
          </Card>

          <Card>
            <div className="w-full flex flex-col justify-center gap-4">
              <p className="text-lg font-semibold text-gray-800 text-center">
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
              <Button onClick={handleMostEmissionsCo2PerYear}>Buscar</Button>
            </div>
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
                A fonte responsável pela maior parte das emissões de CO2 em
                nível global
              </h5>
              <Button onClick={() => setChart("common-emission-fonts")}>
                Buscar
              </Button>
            </Card.Body>
          </Card>

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
                As fontes de emissão de CO2 que tiveram o maior aumento
                percentual em
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

              <Button onClick={() => setChart("common-emission-fonts")}>
                Buscar
              </Button>
            </Card.Body>
          </Card>

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

              <Button onClick={() => setChart("common-emission-fonts")}>
                Buscar
              </Button>
            </Card.Body>
          </Card> */}
        </div>
      </div>

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

          {chart === "q4" && <CountriesCo2PerCapita data={data} />}
          {chart === "q5" && <Q5 data={data} quant={Number(q5Form.quant)} />}

          {chart === "error" && (
            <div className="flex flex-col items-center justify-center gap-4">
              <WarningCircle size={32} className="text-red-400" />
              <p className="text-sm font-semibold text-center mb-4 text-red-400">
                Aconteceu um erro ao buscar os dados, verifique se os campos foram preenchidos corretamente.
              </p>
            </div>
          )}
          <div className="flex justify-end mt-4">
            <Button onClick={handleClose}>Fechar</Button>
          </div>
        </Modal>
      )}

      {/* <Offcanvas placement="top" show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Resultado</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{height:'100%'}}>

      </Offcanvas.Body>
    </Offcanvas> */}
    </>
  );
}

export default App;
