import { Component } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import logo from '../../assets/img/Logo_completo.png'
import imgLogin from '../../assets/img/img_login.png'
import { parseJWT, usuarioAutenticado } from "../../services/auth";

import "../../assets/css/estiloLogin.css"

export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            email: "administrador@gmail.com",
            senha: "123456",
            erroMensagem: "",
            isLoading: false
        }
    };

    EfetuaLogin = (evento) => {
        evento.preventDefault();

        this.setState({ erroMensagem: '', isLoading: true });

        axios.post("http://localhost:5000/api/Login", {
            email: this.state.email,
            senha: this.state.senha
        })

        .then(resposta => {
            if (resposta.status === 200) {
                // console.log("token: " + resposta.data.token);

                localStorage.setItem("usuario-login", resposta.data.token);

                this.setState({ isLoading: false});

                // let base64 = localStorage.getItem("usuario-login").split(".")[1];

                // console.log("base64: " + base64);

                // console.log(this.props);

                switch (parseJWT().role) {
                    case "1":
                        this.props.history.push("/consultasAdm")
                        console.log("estou logado: " + usuarioAutenticado())
                        break;

                    case "2":
                        this.props.history.push("/consultasMedico")
                        console.log("estou logado: " + usuarioAutenticado())
                        break;

                    case "3":
                        this.props.history.push("/consultasPaciente")
                        console.log("estou logado: " + usuarioAutenticado())
                        break;
                
                    default:
                        this.props.history.push("/")
                        break;
                }
            }
        }).catch( erro => console.log(erro), this.setState({ erroMensagem: "credenciais inválidas"}))

    }

    AtualizaStateCampo = (campo) =>{
        this.setState({[campo.target.name]: campo.target.value })
    }

    render(){
        return(
            <div className="login_corpo">
                <header>
                    <div className="container container_header_login">
                        <Link to="/"><img className="logo_completo" src={logo} alt="Logo" /></Link>
                    </div>
                </header>
                <main>
                    <div className="principal">
                        <div>
                            <img src={imgLogin} alt="" />
                        </div>
                        <div className="box_login">
                            <form onSubmit={this.EfetuaLogin} className="formulario">
                                <h1>Login</h1>
                                <div>
                                    <label htmlFor="email">Email:</label><br />
                                    <input type="email" id="email" name="email" value={this.state.email} onChange={this.AtualizaStateCampo} placeholder="Digite seu email" /><br />
                                </div>
                                <div>
                                    <label htmlFor="senha">Senha:</label><br />
                                    <input type="password" id="senha" name="senha" value={this.state.senha} onChange={this.AtualizaStateCampo} placeholder="Digite sua senha" /><br />
                                </div>
                                <button type="submit">Login</button>
                                <p className="erroMensagem">{this.state.erroMensagem}</p>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        )
    }
}