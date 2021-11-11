import { useState, useEffect } from "react";
import axios from "axios";
import Cabecalho from "../../components/cabecalho/cabecalho"
import Rodape from "../../components/rodape/rodape"

import "../../assets/css/consultas.css"

export default function ConsultasAdm() {
    const [listaConsultas, setListaConsultas] = useState([]);


    // const [ listaPacientes, setListaPacientes]  = useState( [] );
    // const [ listaMedicos, setListaMedicos] = useState( [] );
    // const [ listaSituacao, setListaSituacao] = useState( [] );

    // const [ idPaciente, setIdPaciente] = useState("");
    // const [ idMedico, setIdMedico] = useState("");
    // const [ idSituacao, setIdSituacao] = useState("");
    // const [ dataConsulta, setDataConsulta] = useState(new Date());
    // const [ descricaoConsulta, setDescricaoConsulta] = useState("");

    function buscarConsultas() {
        axios("http://localhost:5000/api/Consultas", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaConsultas(resposta.data);
                    // console.log(resposta.data)
                    // console.log(listaConsultas)
                }
            }).catch(erro => console.log(erro));
    }

    useEffect(buscarConsultas, []);

    return (

        <div>
            <Cabecalho />
            <main>
                <div className="container container_banner_consultas">
                    <h1>Lista de consultas</h1>
                </div>
                <button className="botao">cadastrar</button>
                <section className=" container listagem">
                    <h2>Listagem</h2>

                    {
                        listaConsultas.map((consulta) => {
                            return(
                                <div className=" consulta">
                                <div className="informacoes_principais">
                                    <div className="info_users">
                                        <div className="info">
                                            <p className="chave">Paciente:</p>
                                            <p className="valor">{consulta.idPacienteNavigation.nomePaciente}</p>
                                        </div>
                                        <div className="info">
                                            <p className="chave">Medico:</p>
                                            <p className="valor">{consulta.idMedicoNavigation.nomeMedico} {consulta.idMedicoNavigation.sobrenomeMedico}</p>
                                        </div>
                                        <div className="info">
                                            <p className="chave">Especialidade:</p>
                                            <p className="valor">{consulta.idMedicoNavigation.idEspecialidadeNavigation.tituloEspecialidade}</p>
                                        </div>
                                    </div>
                                    <div className="info_consulta">
                                        <div className="situacao">
                                            <div className=" info chave ">
                                                <select className="status vazio" name="status" id="status">
                                                    <option value="0">Agendada</option>
                                                    <option value="1" >Realizada</option>
                                                    <option value="2">Cancelada</option>
                                                </select>
                                                <button type="button" className="vazio"><i className="far fa-edit"></i></button>
                                            </div>

                                        </div>
                                        <div className="info">
                                            <p className="chave">Data da Consulta:</p>
                                            <p className="valor">{Intl.DateTimeFormat("pt-BR",{
                                                year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"
                                            }).format(new Date(consulta.dataConsulta))}</p>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="informacoes_secundarias">
                                    <p className="chave">Descricao da consulta</p>
                                    <button type="button" className="vazio"><i className="fas fa-chevron-down"></i></button>
                                </div>
                                <div className="descricao">
                                    <textarea name="texto_desc" id="texto_desc" className="valor vazio" style={{ resize: "none", display: "none" }}
                                        cols="86" rows="10" readOnly=""></textarea>
                                </div>
                            </div>

                            )
                            
                        })
                    }


                    <div className=" consulta">
                        <div className="informacoes_principais">
                            <div className="info_users">
                                <div className="info">
                                    <p className="chave">Paciente:</p>
                                    <p className="valor">Fernando</p>
                                </div>
                                <div className="info">
                                    <p className="chave">Medico:</p>
                                    <p className="valor">Roberto Possarle</p>
                                </div>
                                <div className="info">
                                    <p className="chave">Especialidade:</p>
                                    <p className="valor">Psquiatria</p>
                                </div>
                            </div>
                            <div className="info_consulta">
                                <div className="situacao">
                                    <div className=" info chave ">
                                        <select className="status vazio" name="status" id="status">
                                            <option value="0">Agendada</option>
                                            <option value="1">Realizada</option>
                                            <option value="2">Cancelada</option>
                                        </select>
                                        <button type="button" className="vazio"><i className="far fa-edit"></i></button>
                                    </div>

                                </div>
                                <div className="info">
                                    <p className="chave">Data da Consulta:</p>
                                    <p className="valor">02/07/2020 11:00</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="informacoes_secundarias">
                            <p className="chave">Descricao da consulta</p>
                            <button className="vazio"><i className="fas fa-chevron-up"></i></button>
                        </div>
                        <div className="descricao">
                            <textarea name="texto_desc" id="texto_desc" className="valor vazio" style={{ resize: "none", cols: 86 }}
                                rows="10" readOnly="">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                                took a galley of type and scrambled it to make a type specimen book. It has survived not only
                                five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
                                passages, and more recently with desktop publishing software like Aldus PageMaker including
                                versions of Lorem Ipsum.</textarea>

                            <button className="vazio"><i className="far fa-edit"></i></button>

                            <button className="botao">Atualizar</button>
                        </div>
                    </div>

                </section>

                <section className="container cadastro">
                    <h2>Cadastro</h2>
                    <div className="container_cadastro">
                        <form className="container_cadastro">
                            <div className="inputs">
                                <div className="input_users">
                                    <div className="campo_">
                                        <label htmlFor="paciente">Paciente:</label><br />
                                        <select name="paciente" id="paciente" name="paciente" value="">
                                        </select><br />
                                    </div>
                                    <div className="campo_">
                                        <label htmlFor="medico">Medico:</label><br />
                                        <select name="medico" id="medico" name="medico" value="">
                                        </select><br />
                                    </div>
                                    <div className="campo_">
                                        <label htmlFor="situacao">Situacao:</label><br />
                                        <select name="situacao" id="situacao" name="email" value="">
                                        </select><br />
                                    </div>
                                </div>
                                <div className="input_consulta">
                                    <div className="campo">
                                        <label htmlFor="data">Data da consulta</label><br />
                                        <input name="data" id="data" type="datetime-local" />
                                    </div>
                                    <div className="campo">
                                        <label htmlFor="descricao">Descricao</label><br />
                                        <textarea name="descricao" id="descricao" cols="30" rows="10"></textarea>
                                    </div>
                                </div>
                            </div>
                            <button className="botao">cadastrar</button>
                        </form>
                    </div>
                </section>
            </main>

            <Rodape />


        </div>
    )
}