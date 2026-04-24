import { useState } from "react";

type Props = {
    filters: string[];
    onFilter: (params: any) => void;
}

export default function FilterBar({ filters, onFilter }: Props) {
    const [values, setValues] = useState<any>({});

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
            {filters.map((field) => (
                <input
                    key={field}
                    name={field}
                    placeholder={`Filtrar por ${field}`}
                    onChange={handleChange}
                    style={{ marginRight: "10px" }}
                />
            ))}

            <button type="submit">Filtrar</button>
        </form>
    );
}