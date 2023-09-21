import { LoginProps } from "./Login";
import { Button } from "./button"
import { useState } from "react"
import api from "../infra/services/api";
import useGlobalStore from "../infra/store";
import { User } from "../App";
import { useQuery } from "react-query";


export const Register = ({ onComplete, close }: LoginProps) => {
    const { setLoading } = useGlobalStore();

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const {refetch} = useQuery({
        queryKey: "register",
        onSettled: () => setLoading(false),
        queryFn: async () => {
            setLoading(true);
            await api.post<{ user: User }>("/register", form)
            const { data } = await api.post<{ user: User, token: string }>("/login", form);
            return data;
        },
        cacheTime: 1000 * 60 * 60 * 24 * 14 , // 2 weeks
        onSuccess: (data) => {
            onComplete(data.user, data.token);
            close();
        },
        onError: () => {
            setError("Erro ao registrar, tente novamente mais tarde.");
        },
        enabled: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    })


    const [error, setError] = useState(null)

    const validateForm = () => {

        let isValid = true;

        Object.entries(form).forEach(([_, value]) => {
            console.log(value)
            if (value == "") isValid = false;
        })

        return isValid
    }

    const onRegister = async () => {
        if (!validateForm()) {
            setError("Preencha todos os campos do formulario.");
            return;
        }
        refetch()
    }

    return (
        <>

            <h1 className="text-xl text-gray-700 font-bold mb-4">Cadastro</h1>
            <div className="flex flex-col gap-6">

                <div className="flex flex-col gap-2 ">
                    <label>Username</label>
                    <input className="bg-gray-300 rounded-md p-2" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                </div>
                <div className="flex flex-col gap-2 ">
                    <label>Senha</label>
                    <input className="bg-gray-300 rounded-md p-2" type="password" name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>

                {error && <p className="text-red-700 text-sm ">
                    {error}
                </p>}
                <Button onClick={onRegister}>
                    Cadastre-se
                </Button>
            </div>
        </>

    )
}