import { useEffect } from "react";
import useGlobalStore from "../infra/store";
import { User } from "../App";
import api from "../infra/services/api";
import { getCountries } from "../infra/actions/getCountries";

export const useUser = () => {

    const fetchCountries = async () => {
        setLoading(true);
        const data = await getCountries();
        setCountries(data);
        setLoading(false);
    };

    const { setCountries, setLoading, setUser } = useGlobalStore();

    const signIn = (user: User, token: string) => {
        setUser({ ...user });
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
        fetchCountries();
    };

    const logOut = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = ``;
        setCountries([]);
    };

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (user) {
            setUser(JSON.parse(user))
        }
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${token}`;
            fetchCountries();
        }
    }, []);

    return {
        signIn,
        logOut
    };
}