import { getCountries } from "../actions/getCountries";
import { Country } from "../types/country";
import { useState, useEffect } from "react";

interface useCountriesProps {
  setLoading: (state: boolean) => void;
}

export const useCountries = (setLoading:(state: boolean) => void) => {
  const [countries, setCountries] = useState<{ country: Country }[]>([]);

  const fetch = async () => {
    const data = await getCountries();
    setCountries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return { countries, fetch };
};
