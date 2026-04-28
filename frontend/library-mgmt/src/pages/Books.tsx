import CrudList from "../components/CrudList";
import { 
    getBooks,
    createBook,
    updateBook,
    deleteBook 
} from "../services/crud/books";

import { 
    type Book,
    displayFields,
    formFields,
    bookFilters 
} from "../types/Book";

export default function Books(){
    return (
        <CrudList<Book>
            title="Books"
            formFields={formFields}
            displayFields={displayFields}
            filterFields={bookFilters}
            getAll={getBooks}
            create={createBook}
            update={updateBook}
            remove={deleteBook}
        />
    );
}