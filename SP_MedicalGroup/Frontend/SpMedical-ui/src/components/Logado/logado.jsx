import { Link } from "react-router-dom";
import { usuarioAutenticado, parseJWT } from "../../services/auth"


export default function Analise() {

    if (usuarioAutenticado() === true) {
        
        switch (parseJWT().role) {
            case "1":
                console.log("sou adm");
                return( <Link to="/consultasAdm">Consultas</Link>)
                break;

            case "2":
                return(<Link to="/consultasMedico">Consultas</Link>)
                break;

            case "3":
                return(<Link to="/consultasPaciente">Consultas</Link>)
                break;
        
            default:
                return(<Link to="/">Consultas</Link>)
                break;
        }
    } else{
        return<Link to="/login">Login</Link>
    }

    
}
