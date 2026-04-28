export type Genre = {
    id: number;
    name: string;
}

export const formFields: (keyof Genre)[] = [
    "name"
]

export const displayFields: (keyof Genre)[] = [
    "id",
    "name"
]