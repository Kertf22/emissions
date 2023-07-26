import { LoginProps } from "./Login";
import { Button } from "./components/button"
import { useState } from "react"
import api from "./infra/services/api";
import useGlobalStore from "./infra/store";
import { User } from "./App";


export const Register = ({ onComplete, close }: LoginProps) => {
    const { setLoading } = useGlobalStore();

    const [form, setForm] = useState({
        username: '',
        password: '',
    });

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

        close();
        setLoading(true);
        try {
            const { data } = await api.post<{ user: User }>("/register", form)
            const { data: { token } } = await api.post<{ user: User, token: string }>("/login", form);
            onComplete(data.user, token);
            close();

        } catch (err) {
            setError("Erro ao logar, tente novamente mais tarde.");
        }

        setLoading(false);
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