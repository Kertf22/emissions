import { User } from "./App"
import { Button } from "./components/button"
import { useState } from "react"

export interface LoginProps {
    setLoading: (state:boolean) => void;
    loading:boolean;
    onComplete: (user: User) => void 
}

export const Login = ({ onComplete }: LoginProps ) => {

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

    const onLogin = () => {
        if (!validateForm()) {
            setError("Preencha todos os campos do formulario.");
            return;
        }


        // onComplete()
    }

    return (
        <>

            <h1 className="text-xl text-gray-700 font-bold mb-4">Login</h1>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2 ">
                    <label>Login</label>
                    <input className="bg-gray-300 rounded-md p-2" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                </div>
                <div className="flex flex-col gap-2 ">
                    <label>Senha</label>
                    <input className="bg-gray-300 rounded-md p-2" name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                </div>

                {error && <p className="text-red-700 text-sm ">
                    {error}
                </p>}
                <Button onClick={onLogin}>
                    Logue
                </Button>
            </div>
        </>
    )
}