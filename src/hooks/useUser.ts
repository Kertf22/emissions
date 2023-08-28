import { useEffect } from "react";
import useGlobalStore from "../infra/store";
import { User } from "../App";
import api from "../infra/services/api";
import { getCountries } from "../infra/actions/getCountries";
import decode from "jwt-decode";
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
        localStorage.setItem("token", token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
        fetchCountries();
    };

    const logOut = () => {
        setUser(null);
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = ``;
        setCountries([]);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log(token)
        if (token) {
            try {
                const user = decode<User>(token);
                if (user) {
                    setUser(user);
                    api.defaults.headers.Authorization = `Bearer ${token}`;
                    fetchCountries();
                } else {
                    throw new Error("Invalid token");
                }

            } catch (error) {
                return logOut();
            }
        }
    }, []);

    return {
        signIn,
        logOut
    };
}