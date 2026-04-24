import { useEffect, useState } from "react";
import { FormFeedback, type FeedbackMessage } from "./FormFeedback";
import FilterBar from "./FilterBar";

type Props = {
    title: string;
    fields: string[];
    getAll: (param: {}) => Promise<any>;
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

        const [message, setMessage] = useState<FeedbackMessage | null>(null);
        const [loading, setLoading] = useState(false);

        const notify = (text: string, type: 'success' | 'error', details?: any) => {
            setMessage({ text, type, details });

            if (type === 'success') {
                setTimeout(() => setMessage(null), 5000); // some apos 5s
            }
        }

        async function fetchData(params = {}){
            const res = await getAll(params);
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
            setLoading(true);

            try {
                if (editingId) {
                    await update(editingId, form);
                    notify("Atualizado com sucesso!", "success");
                } else {
                    await create(form);
                    notify("Adicionado com sucesso!", "success");
                }

                setForm({});
                setEditingId(null);
                fetchData();
            } catch (error: any) {
                const data = error.response?.data;
                const errorMsg = data?.message || "Erro ao processar request.";
                notify(errorMsg, "error", data?.details);
            } finally {
                setLoading(false);
            }
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

                <FilterBar
                    filters={["title", "author", "genre"]}
                    onFilter={fetchData}
                />

                {/* Mensagem de Feedback */}
                <FormFeedback message={message} />

                {/* FORM */}
                <form onSubmit={handleSubmit}>
                    {fields.map((field) => (
                        <input
                            key={field}
                            placeholder={field}
                            value={form[field] || ""}
                            onChange={(e) => handleChange(e, field)}
                            disabled={loading}
                        />
                    ))}
                    <button type="submit" disabled={loading}>
                        {loading ? "Salvando..." : (editingId ? "Atualizar": "Criar")}
                    </button>
                    {editingId && 
                    <button onClick={() => {setEditingId(null); setForm({});}}>
                        Cancelar
                    </button>}
                </form>

                {/* LISTA */}
                <ul>
                    {items.map((item) => (
                        <li key={item.id}>
                            {fields.map((f) => item[f]).join(" - ")}

                            <button onClick={() => handleEdit(item)}>
                                Editar
                            </button>

                            <button onClick={() => 
                                {if (window.confirm("Deseja realmente excluir?")) 
                                handleDelete(item.id)
                            }}
                            style={{ color: 'red' }}
                            >
                                Deletar
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        );
}