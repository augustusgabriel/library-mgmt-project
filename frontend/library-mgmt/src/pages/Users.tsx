import { useState, useEffect } from "react";
import { getUsers } from "../services/users";
import UserItem from "../components/UserItem";

export default function Users() {
    const [users, setUsers] = useState([]);

    async function fetchUsers() {
        const res = await getUsers();
        setUsers(res.data.results || res.data);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Usuários</h2>

            <ul>
                {users.map((u: any) => (
                    <UserItem
                        key={u.id}
                        user={u}
                        onRefresh={fetchUsers} // recarrega lista toda vez, chama API
                    />
                ))}
            </ul>
        </div>
    );
}