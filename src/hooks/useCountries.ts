import { User } from "../App";
import { getCountries } from "../infra/actions/getCountries";
import useGlobalStore from "../infra/store";
import {  useEffect } from "react";

// interface useCountriesProps {
//   setLoading: (state: boolean) => void;
// }

export const useCountries = (user:User) => {

  const { setCountries, setLoading } = useGlobalStore();

  const fetch = async () => {
    setLoading(true);
    const data = await getCountries();
    setCountries(data);
    setLoading(false);
  };

  useEffect(() => {
    if(user) {
      fetch();
    }else{
      setCountries([]);
    }
  }, [user]);
};
