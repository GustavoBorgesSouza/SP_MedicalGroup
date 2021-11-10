import React from 'react'
import logoSimples from '../../assets/img/LogoSimples.png'

import Whatsapp from "../../components/icones/whatsapp"
import Facebook from '../icones/facebook'
import Instagram from '../icones/instagram'

export default function Rodape() {
    return (
        <footer>
        <div className="container container_footer">
            <div className="bloco_footer">
                <p>links uteis:</p>
                <ul>
                    <li>regras de utilização</li>
                    <li>suporte</li>
                    <li>central de ajuda</li>
                </ul>
            </div>
            <div className="main_footer">
                <img src={logoSimples} alt="" />
                <span>@São Paulo Medical Group</span>
                <p>Todos os direitos reservados</p>
            </div>
            <div className="bloco_footer contato">
                <p>Contato:</p>
                <ul>
                    <li><Whatsapp/>Whatsapp</li>
                    <li><Facebook/> Facebook</li>
                    <li><Instagram/>Instagram</li>
                </ul>
            </div>
        </div>
    </footer>
    )
}