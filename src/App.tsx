import BaseChart from "./charts/TotalByCountry"
import api from "./services/api"
import ByStartYearAndCountry from "./charts/ByStartYearAndCountry"
import {useState, useEffect} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import _ from "lodash";
import { Button } from "react-bootstrap";



const TotalByCountryDataExample = [
  {
    "country": "Afghanistan",
    "total": 0.4
  },
  {
    "country": "Albania",
    "total": 0.8
  },
  {
    "country": "Algeria",
    "total": 3.5
  }
]

const EmissionsByStartYearAndCountryDataExample = [
  {
    "country": "Afghanistan",
    "coal": 2.0,
    "oil": 20,
    "gas": 10,
    "flaring": 9,
    "cement": 8,
    "other": 7,
    "total": 1.5,
    "year": 2020
  }
] 


function App() {

  const [chart, setChart] = useState('total-by-country')
  const [countries, setCountries] = useState([] as any)
  const [data, setData] = useState([] as any)

  const [selectedCountry, setSelectedCountry] = useState('' as any)
  const [selectedYear, setSelectedYear] = useState('' as any)
  const [selectedFont, setSelectedFont] = useState('' as any)
  const [selectedAmountFonts, setSelectedAmountFonts] = useState('' as any)
  const [selectedAmountCountries, setSelectedAmountCountries] = useState('' as any)

  const availableYears = _.range(2021,1749,-1);
  const totalFonts = _.range(1,7);



  useEffect(() => {
    api.get('/country').then((response) => {
      console.log(response.data)
      setCountries(response.data)
    })

  },[])

  return (
    <>
    <div style={{width: '100%', justifyContent:'center', display:'flex', padding:'16px', flexDirection:'column', alignItems:"center"}}>
      <h1 style={{textAlign:'center'}}>Emissões de CO2</h1>
      <div style={{display:'flex', alignItems:'flex-start', flexDirection:'column'}}>

     
      
      <div style={{display:'flex', alignItems:'center', padding:'5px', gap: '16px',justifyContent:'flex-start'}}>
      <h5 style={{textAlign:'center'}}>Emissões totais em</h5>  
      <select onChange={(ev) => {
        setSelectedYear(ev.target.value)
      }}>
        <option>Insira o ano</option>
        {
          availableYears.map((year) => {
            return <option value={year}>{year}</option>
          })
        }
      </select>
      <h5>no país</h5>
      <select  
      onChange={(ev) => {
        setSelectedCountry(ev.target.value)
      }}
      >
        {
          countries.map((country: any) => {
            return <option value={country.country}>{country.country}</option>
          })
        }
      </select>
      <Button style={{justifySelf:'flex-end'}} onClick={() => {
        console.log('ee')
        api.get(`/country/${selectedCountry}/${selectedYear}`).then((response) => {
          setData([response.data[0]])
          setChart('by-start-year-and-country')
        })
     
      }}>Buscar</Button>
      </div>

      <div style={{display:'flex', alignItems:'center', padding:'5px', gap: '16px', justifyContent:'space-around'}}>
      <h3 style={{textAlign:'center'}}>As</h3>  
      <select onChange={
        (ev) => {
          setSelectedAmountFonts(ev.target.value)
      }}>
        <option>Selecione a quantidade</option>
        {
          totalFonts.map((font) => {
            return <option value={font}>{font}</option>
          })
        }
      </select>
      <span>principais fontes de emissão de CO2 em</span>
      <select 
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
      </select>
      <Button onClick={() => setChart('main-emission-fonts-by-country')}>Buscar</Button>
      </div>

      <div style={{display:'flex', alignItems:'center', padding:'5px', gap: '16px', justifyContent:'flex-start'}}>
      <h5 style={{textAlign:'center'}}>As</h5>  
      <select 
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
      </select>
      <h5>fontes mais comuns de emissão de CO2</h5>
      <Button onClick={() => setChart('common-emission-fonts')}>Buscar</Button>
      </div>


      <div style={{display:'flex', alignItems:'center', padding:'5px', gap: '16px',justifyContent:'flex-start'}}>
      <h5 style={{textAlign:'center'}}>Os</h5>  
      <select
      onChange={(ev) => {
        setSelectedCountry(ev.target.value)
      }}
      >
        <option>Selecione a quantidade</option>
        {
          countries.map((country: any, index: number) => {
            return <option  value={index+1}>{index+1}</option>
          })
        }
      </select>
      <h5>países que mais contribuem para as emissões de CO2 per capita</h5>
      <Button onClick={() => setChart('common-emission-fonts')}>Buscar</Button>
      </div>


      <div style={{display:'flex', alignItems:'center', padding:'5px', gap: '16px',justifyContent:'flex-start'}}>
      <h5 style={{textAlign:'center'}}>Os</h5>  
      <select onChange={(ev) => {
        setSelectedAmountCountries(ev.target.value)
      }}>
        <option>Selecione a quantidade</option>
        {
          countries.map((country: any, index: number) => {
            return <option  value={index+1}>{index+1}</option>
          })
        }
      </select>
      <h5>países com as maiores emissões de CO2 totais no ano</h5>
      <select
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
      </select>
      <Button onClick={() => setChart('common-emission-fonts')}>Buscar</Button>
      </div>


      <div style={{display:'flex', alignItems:'center', padding:'5px', gap: '16px',justifyContent:'flex-start'}}>
      <h5 style={{textAlign:'center'}}>A fonte responsável pela maior parte das emissões de CO2 em nível global</h5>  
      <Button onClick={() => setChart('common-emission-fonts')}>Buscar</Button>
      </div>


      <div style={{display:'flex', alignItems:'center', padding:'5px', gap: '16px',justifyContent:'flex-start'}}>
      <h5 style={{textAlign:'center'}}>As fontes de emissão de CO2 que tiveram o maior aumento percentual em</h5>
      <select onChange={(ev) => {
        setSelectedCountry(ev.target.value)
      }}>
        <option>Selecione o país</option>
        {
          countries.map((country: any) => {
            return <option  value={country.country}>{country.country}</option>
          })
        }
        </select>
      <span></span>

      <Button onClick={() => setChart('common-emission-fonts')}>Buscar</Button>
      </div>


      <div style={{display:'flex', alignItems:'center', padding:'5px', gap: '16px',justifyContent:'flex-start'}}>
      <h5 style={{textAlign:'center'}}>A média de emissão de CO2 em</h5>
      <select 
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
        </select>
      <span></span>

      <Button onClick={() => setChart('common-emission-fonts')}>Buscar</Button>
      </div>


      </div>
      
    </div>
 
    <div style={{display:'flex', justifyItems:'center', justifyContent:"center", alignItems:'center'}}> 
    
    
    {
      chart === 'total-by-country' && 
      <BaseChart data={data} />
    }

{
      chart === 'by-start-year-and-country' && 
      <ByStartYearAndCountry data={data} />
    }
    

    </div>
    </>
  )
}

export default App
