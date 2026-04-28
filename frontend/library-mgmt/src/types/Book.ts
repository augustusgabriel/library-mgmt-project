export type Book = {
    id: number;
    title: string;
    author: string;
    number_pages: number;
    genre: number;
    genre_name: string;
}

export const formFields: (keyof Book)[] = [
    "title",
    "author",
    "number_pages",
    "genre"
]

export const displayFields: (keyof Book)[] = [
    "title",
    "author",
    "number_pages",
    "genre",
    "genre_name"
]

export const bookFilters: Partial<Record<keyof Book, string>> = {
    title: "Título do livro",
    author: "Autor do livro",
    genre: "Gênero literário"
}