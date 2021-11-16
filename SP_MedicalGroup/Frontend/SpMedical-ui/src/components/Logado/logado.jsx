import { Link } from "react-router-dom";
import { usuarioAutenticado, parseJWT } from "../../services/auth"


export default function Analise() {

    if (usuarioAutenticado() === true) {
        
        switch (parseJWT().role) {
            case "1":
                console.log("sou adm");
                return( <Link to="/consultasAdm">Consultas</Link>)


            case "2":
                return(<Link to="/consultasMedico">Consultas</Link>)


            case "3":
                return(<Link to="/consultasPaciente">Consultas</Link>)

        
            default:
                return(<Link to="/">Consultas</Link>)

        }
    } else{
        return<Link to="/login">Login</Link>
    }

    
}
