import { useEffect, useState } from "react"


const useLocation = () => {
    const [location, setLocation] = useState<GeolocationPosition>(null);
    const geo = navigator.geolocation;

    useEffect(() => {
        geo.getCurrentPosition((a) => setLocation(a));
    }, []);

    return { location }
};

export default useLocation;