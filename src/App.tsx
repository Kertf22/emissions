/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseChart from "./components/charts/TotalByCountry"
import api from "./services/api"
import ByStartYearAndCountry from "./components/charts/ByStartYearAndCountry"
import {useState, useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from "lodash";
import { Button, Form, Offcanvas, Modal, Card } from "react-bootstrap";
import Spinner from "./components/spinner";
import "./App.css"

function App() {

  const [chart, setChart] = useState('total-by-country')
  const [countries, setCountries] = useState([] as any)
  const [data, setData] = useState([] as any)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const [selectedCountry, setSelectedCountry] = useState('' as any)
  const [selectedYear, setSelectedYear] = useState('' as any)
  // const [selectedFont, setSelectedFont] = useState('' as any)
  const [
    // selectedAmountFonts, 
    ,setSelectedAmountFonts] = useState('' as any)
  const [
    // selectedAmountCountries, 
    ,setSelectedAmountCountries] = useState('' as any)

  const [loading, setLoading] = useState(false);

  const availableYears = _.range(2021,1749,-1);
  const totalFonts = _.range(1,7);

  useEffect(() => {
    setLoading(true)
    api.get('/country').then((response) => {
      console.log(response.data)
      setCountries(response.data)
      setLoading(false)
    })

  },[])


  return (
    <>
    <div style={{width: '100%', justifyContent:'center', display:'flex', padding:'16px', flexDirection:'column', alignItems:"center",}}>


    <Spinner show={loading} />
      <h1 style={{textAlign:'center'}}>Emissões de CO2</h1>
      <div style={{display:'flex', alignItems:'center', flexDirection:'row', flexWrap:'wrap', gap: '1rem', justifyContent:'flex-start'}}>

     
      
      <Card >
        <Card.Body style={{display:'flex', alignItems:'center', padding:'1rem', gap: '8px',justifyContent:'flex-start', flexDirection:'column'}}>
      <Card.Title>Emissões totais em</Card.Title>  
      <Form.Select onChange={(ev) => {
        setSelectedYear(ev.target.value)
      }}>
        <option>Insira o ano</option>
        {
          availableYears.map((year) => {
            return <option value={year}>{year}</option>
          })
        }
      </Form.Select>
      <h5>no país</h5>
      <Form.Select  
      onChange={(ev) => {
        setSelectedCountry(ev.target.value)
      }}
      >
        {
          countries.map((country: any) => {
            return <option value={country.country}>{country.country}</option>
          })
        }
      </Form.Select>
      <Button style={{justifySelf:'flex-end'}} onClick={() => {
        setLoading(true)
        api.get(`/country/${selectedCountry}/${selectedYear}`).then((response) => {
          setLoading(false)
          setData([response.data[0]])
          setChart('by-start-year-and-country')
          setShow(true)
        })
     
      }}>Buscar</Button>
      </Card.Body>
      </Card>


      <Card>
      <Card.Body style={{display:'flex', alignItems:'center', padding:'1rem', gap: '8px',justifyContent:'flex-start', flexDirection:'column'}}>
      <h3 style={{textAlign:'center'}}>As</h3>  
      <Form.Select onChange={
        (ev) => {
          setSelectedAmountFonts(ev.target.value)
      }}>
        <option>Selecione a quantidade</option>
        {
          totalFonts.map((font) => {
            return <option value={font}>{font}</option>
          })
        }
      </Form.Select>
      <span>principais fontes de emissão de CO2 em</span>
      <Form.Select 
              onChange={(ev) => {
                setSelectedYear(ev.target.value)
              }}
      >
        <option
        >Selecione um país</option>
        {
          countries.map((country: any) => {
            return <option  value={country.country}>{country.country}</option>
          })
        }
      </Form.Select>
      <Button onClick={() => setChart('main-emission-fonts-by-country')}>Buscar</Button>
      </Card.Body>
      </Card>


<Card>
      <Card.Body style={{display:'flex', alignItems:'center', padding:'1rem', gap: '8px',justifyContent:'flex-start', flexDirection:'column'}}>
      <h5 style={{textAlign:'center'}}>As</h5>  
      <Form.Select 
              onChange={(ev) => {
                setSelectedAmountFonts(ev.target.value)
              }}
      >
        <option>Selecione a quantidade</option>
        {
          totalFonts.map((font) => {
            return <option value={font}>{font}</option>
          }
          )
        }
      </Form.Select>
      <h5>fontes mais comuns de emissão de CO2</h5>
      <Button onClick={() => setChart('common-emission-fonts')}>Buscar</Button>
      </Card.Body>
      </Card>

<Card>
      <Card.Body style={{display:'flex', alignItems:'center', padding:'1rem', gap: '8px',justifyContent:'flex-start', flexDirection:'column'}}>
      <h5 style={{textAlign:'center'}}>Os</h5>  
      <Form.Select
      onChange={(ev) => {
        setSelectedCountry(ev.target.value)
      }}
      >
        <option>Selecione a quantidade</option>
        {
          countries.map((_country: any, index: number) => {
            return <option  value={index+1}>{index+1}</option>
          })
        }
      </Form.Select>
      <h5>países que mais contribuem para as emissões de CO2 per capita</h5>
      <Button onClick={() => setChart('common-emission-fonts')}>Buscar</Button>
      </Card.Body>
      </Card>


<Card>
      <Card.Body style={{display:'flex', alignItems:'center', padding:'1rem', gap: '8px',justifyContent:'flex-start', flexDirection:'column'}}>
      <h5 style={{textAlign:'center'}}>Os</h5>  
      <Form.Select onChange={(ev) => {
        setSelectedAmountCountries(ev.target.value)
      }}>
        <option>Selecione a quantidade</option>
        {
          countries.map((_country: any, index: number) => {
            return <option  value={index+1}>{index+1}</option>
          })
        }
      </Form.Select>
      <h5>países com as maiores emissões de CO2 totais no ano</h5>
      <Form.Select
      onChange={(ev) => {
        setSelectedYear(ev.target.value)
      }}
      >
        <option>Selecione o ano</option>
        {
          availableYears.map((year) => {
            return <option value={year}>{year}</option>
          }
          )
        }
      </Form.Select>
      <Button onClick={() => setChart('common-emission-fonts')}>Buscar</Button>
      </Card.Body>
      </Card>


<Card>
      <Card.Body style={{display:'flex', alignItems:'center', padding:'1rem', gap: '8px',justifyContent:'flex-start', flexDirection:'column'}}>
      <h5 style={{textAlign:'center'}}>A fonte responsável pela maior parte das emissões de CO2 em nível global</h5>  
      <Button onClick={() => setChart('common-emission-fonts')}>Buscar</Button>
      </Card.Body>
      </Card>



<Card>
      <Card.Body style={{display:'flex', alignItems:'center', padding:'1rem', gap: '8px',justifyContent:'flex-start', flexDirection:'column'}}>
      <h5 style={{textAlign:'center'}}>As fontes de emissão de CO2 que tiveram o maior aumento percentual em</h5>
      <Form.Select onChange={(ev) => {
        setSelectedCountry(ev.target.value)
      }}>
        <option>Selecione o país</option>
        {
          countries.map((country: any) => {
            return <option  value={country.country}>{country.country}</option>
          })
        }
        </Form.Select>
      <span></span>

      <Button onClick={() => setChart('common-emission-fonts')}>Buscar</Button>
      </Card.Body>
      </Card>


<Card>
      <Card.Body style={{display:'flex', alignItems:'center', padding:'1rem', gap: '8px',justifyContent:'flex-start', flexDirection:'column'}}>
      <h5 style={{textAlign:'center'}}>A média de emissão de CO2 em</h5>
      <Form.Select 
      onChange={(ev) => {
      setSelectedCountry(ev.target.value)
      }}
      >
        <option>Selecione o país</option>
        {
          countries.map((country: any) => {
            return <option  value={country.country}>{country.country}</option>
          })
        }
        </Form.Select>
      <span></span>

      <Button onClick={() => setChart('common-emission-fonts')}>Buscar</Button>
      </Card.Body>
      </Card>


      </div>
      
    </div>


    <Modal
    show={show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Resultado
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      {
      chart === 'total-by-country' && 
      <BaseChart data={data} />
    }

{
      chart === 'by-start-year-and-country' && 
      <ByStartYearAndCountry data={data} />
    }
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Fechar</Button>
      </Modal.Footer>
    </Modal>


    {/* <Offcanvas placement="top" show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Resultado</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{height:'100%'}}>

      </Offcanvas.Body>
    </Offcanvas> */}
    </>
  )
}

export default App
