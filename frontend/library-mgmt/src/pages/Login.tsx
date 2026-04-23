import { useState, type SubmitEvent } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        try {
            await login(username, password);

            navigate("/");
        } catch (error) {
            alert("Credenciais Inválidas");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <input 
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Entrar</button>
        </form>
    );
}