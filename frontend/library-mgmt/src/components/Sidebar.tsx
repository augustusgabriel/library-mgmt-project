import { Outlet, Link } from "react-router-dom";
import { logout } from "../services/auth";

export default function Sidebar(){
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <aside style={{
                width: "200px",
                background: "black",
                padding: "20px"
            }}>
                <h3>Menu</h3>

                <nav style={{ display:"flex", flexDirection: "column", gap: "10px" }}>
                    <Link to={"/"} >Usuários</Link>
                    <Link to={"/books"} >Books</Link>
                </nav>

                <button onClick={logout} style={{ marginTop: "20px" }}>Sair</button>
            </aside>
            

            <main>
                <Outlet />
            </main>
        </div>
    );
}