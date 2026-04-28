import { useState } from "react";

type Props<T> = {
    filters: Partial<Record<keyof T, string>>;
    onFilter: (params: Partial<T>) => void;
}

export default function FilterBar<T>({ filters, onFilter }: Props<T>) {
    const [values, setValues] = useState<Partial<T>>({});

    function handleChange(e: any){
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    function handleSubmit(e: any) {
        e.preventDefault();
        onFilter(values);
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            {Object.entries(filters).map(([key, label]) => (
                <input
                    key={key}
                    name={key}
                    placeholder={`Filtrar por ${label as string}`}
                    onChange={handleChange}
                    style={{ marginRight: "10px" }}
                />
            ))}

            <button type="submit">Filtrar</button>
        </form>
    );
}