import { useCallback, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from "./components/spinner";
import "./App.css";
import { MdOutlineCo2 } from "react-icons/md";
import { Questions } from "./Questions";
import { Login } from "./components/Login";
import { Modal } from "./components/modal";
import { Register } from "./components/Register";
import useGlobalStore from "./infra/store";
import { useUser } from "./hooks/useUser";
import Header from "./Header";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import useLocation from "./hooks/useLocation";
import { Button } from "./components/button";
import { WarningCircle } from "@phosphor-icons/react";
import BaseChart from "./components/charts/TotalByCountry";
import { MostCommonFonts } from "./components/charts/MostCommonFonts";
import { Q3 } from "./components/charts/Q3";
import CountriesCo2PerCapita from "./components/charts/CountriesCo2PerCapita";
import { Q5 } from "./components/charts/Q5";
import { Q6 } from "./components/charts/Q6";
import { Q7 } from "./components/charts/Q7";
import { Q8 } from "./components/charts/Q8";
import { Q9 } from "./components/charts/Q9";
import { getLocations } from "./infra/actions/getLocations";
import { useQuery } from "react-query";
import { getCountries } from "./infra/actions/getCountries";

export interface User {
  id: string;
  username: string;
}

const containerStyle = {
  maxWidth: "90vw",
  width: "100%",
  height: "500px",
  marginTop: "30px",
  border: "2px solid black",
  borderRadius: "12px"
};

function App() {

  const { loading,user, data, setData, locations,setLoading, setLocations,setCountries } = useGlobalStore();
  
  // Queries
  const {} = useQuery({
    queryKey: "locations",
    queryFn: getLocations,
        staleTime: 1000 * 60 * 60 * 24 * 14 , // 2 weeks
    cacheTime: 1000 * 60 * 60 * 24 * 14 , // 2 weeks
    onSuccess: (data) => {
      setLocations(data)
    }
  })
    
  const {} = useQuery({
    queryKey: ["countries", user],
    onSettled: () => setLoading(false),
    queryFn: async () => {
      if(user){
        return await getCountries();
      }
      throw new Error("User not logged in")
    },
    staleTime: 1000 * 60 * 60 * 24 * 14 , // 2 weeks
    cacheTime: 1000 * 60 * 60 * 24 * 14 , // 2 weeks
    onSuccess: (data) => {
      setCountries(data)
    },

  })

  const handleClose = () => setData(null)

  const { signIn, logOut } = useUser();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAdAmN4FLzLuxVoKk-isILdI2OTb6sn07E",
  });

  useLocation(isLoaded);

  const [_, setMap] = useState(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLoad = useCallback(function callback(map: any) {
    new window.google.maps.LatLngBounds();
    for (const location of locations) {
      new window.google.maps.Marker({
        position: { lat: location?.lat, lng: location?.long },
        map,

        title: location?.city,
      });
    }

    setMap(map);
  }, [locations]);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const center = locations.length > 0 ? { lat: locations[0]?.lat, lng: locations[0]?.long } : { lat: 0, lng: 0 };

  return (
    <>


      <Header logOut={logOut} />

      <div
        className="w-full h-full flex flex-col items-center justify-center py-24">
        <p className="text-3xl font-bold">
          <MdOutlineCo2 size="100" />
        </p>

        <Questions />

        <p className="text-3xl font-bold">
          Acessos ao portal
        </p>



        {isLoaded && locations.length > 0 ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            // center={{
            //   lat: +location?.coords.latitude,
            //   lng: +location?.coords.longitude
            // }}
            zoom={2}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
          </GoogleMap>
        ) : (
          <></>
        )}
      </div>


      {
        data && (
          <Modal open={!!data} closeModal={handleClose}>
            {data.type === "login" && <Login onComplete={signIn} close={handleClose} />}
            {data.type === "register" && <Register onComplete={signIn} close={handleClose} />}

            {data.type != "login" && data.type != "register" && <p className="text-lg font-semibold mb-4">Resultado</p>}
            {data.type === "1" && <BaseChart data={data.value} />}
            {data.type === "2" && <MostCommonFonts data={data.value.data} quant={data.value.quant} />}
            {data.type === "3" && <Q3 data={data.value} />}
            {data.type === "4" && <CountriesCo2PerCapita data={data.value} />}
            {data.type === "5" && <Q5 data={data.value.data} quant={data.value.quant} />}
            {data.type === "6" && <Q6 data={data.value} />}
            {data.type === "7" && <Q7 data={data.value} />}
            {data.type === "8" && <Q8 data={data.value} />}
            {data.type === "9" && <Q9 data={data.value} />}

            {data.type === "error" && (
              <div className="flex flex-col items-center justify-center gap-4">
                <WarningCircle size={52} className="text-red-400" />
                <p className="text-sm font-semibold text-center mb-4 text-red-400">
                  Aconteceu um erro ao buscar os dados, verifique se os campos foram preenchidos corretamente.
                </p>
              </div>
            )}

            {data.type != "login" && data.type != "register" && (
              <div className="flex justify-end mt-4">
                <Button disabled={loading} onClick={handleClose}>Fechar</Button>
              </div>
            )}
          </Modal>)
      }




      <Spinner show={loading} />


    </>
  );
}

export default App;
