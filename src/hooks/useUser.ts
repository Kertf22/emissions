import { useEffect } from "react";
import useGlobalStore from "../infra/store";
import { User } from "../App";
import api from "../infra/services/api";
import decode from "jwt-decode";

export const useUser = () => {



    const { setUser } = useGlobalStore();

    const signIn = (user: User, token: string) => {
        setUser({ ...user });
        localStorage.setItem("token", token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
    };

    const logOut = () => {
        setUser(null);
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = ``;
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