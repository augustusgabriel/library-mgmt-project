import { useState } from "react";
import { updateUser, deleteUser } from "../services/users";

type Props = {
    user: any;
    onRefresh: () => void;
};

export default function UserItem({ user, onRefresh }: Props) {
    const [editing, setEditing] = useState(false);
    const [username, setUsername] = useState(user.username);

    async function handleSave() {
        await updateUser(user.id, { username });
        setEditing(false);
        onRefresh();
    }

    async function handleDelete() {
        await deleteUser(user.id);
        onRefresh();
    }

    return (
        <li>
            {editing ? (
                <>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={handleSave}>Salvar</button>
                    <button onClick={() => setEditing(false)}>Cancelar</button>
                </>
            ): (
                <>
                    {user.username}
                    <button onClick={() => setEditing(true)}>Editar</button>
                    <button onClick={handleDelete}>Deletar</button>
                </>
            )}
        </li>
    );
}