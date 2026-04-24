import CrudList from "../components/CrudList";
import { 
    getBooks,
    createBook,
    updateBook,
    deleteBook } from "../services/books";

export default function Books(){
    return (
        <CrudList 
            title="Books"
            fields={["title", "author", "number_pages", "genre", "genre_name"]}
            getAll={getBooks}
            create={createBook}
            update={updateBook}
            remove={deleteBook}
        />
    );
}