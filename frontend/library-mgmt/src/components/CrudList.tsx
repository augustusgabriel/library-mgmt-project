import { useEffect, useState } from "react";

type Props = {
    title: string;
    fields: string[];
    getAll: () => Promise<any>;
    create: (data: any) => Promise<any>;
    update: (id: number, data: any) => Promise<any>;
    remove: (id: number) => Promise<any>;
}

export default function CrudList({
    title,
    fields,
    getAll,
    create,
    update,
    remove
    }: Props) {
        const [items, setItems] = useState<any[]>([]);
        const [form, setForm] = useState<any>({});
        const [editingId, setEditingId] = useState<number | null>(null);

        async function fetchData(){
            const res = await getAll();
            setItems(res.data.results || res.data);
        }

        useEffect(() => {
            fetchData();
        }, []);

        function handleChange(e: any, field: string) {
            setForm({ ...form, [field]: e.target.value });
        }

        async function handleSubmit(e: any) {
            e.preventDefault();

            if (editingId) {
                await update(editingId, form);
                setEditingId(null);
            } else {
                await create(form)
            }

            setForm({});
            fetchData();
        }

        async function handleEdit(item: any) {
            setEditingId(item.id);
            setForm(item);
        }

        async function handleDelete(id: number) {
            await remove(id);
            fetchData();
        }

        return (
            <div>
                <h2>{title}</h2>

                {/* FORM */}
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <input
                            key={field}
                            placeholder={field}
                            value={form[field] || ""}
                            onChange={(e) => handleChange(e, field)}
                        />
                    ))}
                    <button type="submit">
                        {editingId ? "Atualizar": "Criar"}
                    </button>
                </form>

                {/* LISTA */}
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            {fields.map((f) => item[f]).join(" - ")}

                            <button onClick={() => handleEdit(item)}>
                                Editar
                            </button>

                            <button onClick={() => handleDelete(item.id)}>
                                Deletar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
}