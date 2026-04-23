import { useState, type SubmitEvent } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();

        try {
            await api.post(`${import.meta.env.VITE_API_RESOURCES_URL}/users/`, {
                username,
                password
            });
            alert("Usuário criado!");
            navigate("/login");
        } catch (error) {
            alert("Erro ao criar usuário. Tente novamente.");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                type="password"
                placeholder='Senha'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button type='submit'>Cadastrar</button>
        </form>
    );
}