import { type Genre, displayFields, formFields } from "../types/Genre";
import {
    getGenres,
    createGenre,
    updateGenre,
    deleteGenre
} from "../services/crud/genres";
import CrudList from "../components/CrudList";

export default function Genres(){
    return(
        <CrudList<Genre>
        title="Genres"
        formFields={formFields}
        displayFields={displayFields}
        getAll={getGenres}
        create={createGenre}
        update={updateGenre}
        remove={deleteGenre}
        />
    );
}