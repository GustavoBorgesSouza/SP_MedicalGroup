import React from 'react'
import logo from '../../assets/img/Logo_completo.png'
import User from '../icones/user'
import { Link } from 'react-router-dom';
import Analise from '../Logado/logado';


export default function Cabecalho() {
    return (
        <header>
            <div id="inicio" className="container container_header">
                <Link to="/"><img className="logo_completo" src={logo} alt="Logo" /></Link>
                <nav className="menu_header">
                    <div className="meio_header">
                        <Link to="/" >Início</Link>
                        <a href="#sobre">Sobre</a>
                        <a href="#especialidades">Especialidades</a>
                    </div>
                    <div className="login_header">
                        <Analise />
                        <User/>
                    </div>
                </nav>
            </div>
        </header>
    )
}