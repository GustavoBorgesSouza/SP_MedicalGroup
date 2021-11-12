import { useState, useEffect } from "react";
import axios from "axios";
import Cabecalho from "../../components/cabecalho/cabecalho"
import Rodape from "../../components/rodape/rodape"
import SituacaoConsulta from "../../components/situacaoConsulta/situacaoConsulta";
import SetaCima from "../../components/icones/setaCima";
import SetaBaixo from "../../components/icones/setaBaixo";

import "../../assets/css/consultas.css"

export default function ConsultasAdm() {
    const [listaConsultas, setListaConsultas] = useState([]);

    const [listaPacientes, setListaPacientes] = useState([]);
    const [listaMedicos, setListaMedicos] = useState([]);

    const [idPaciente, setIdPaciente] = useState(0);
    const [idMedico, setIdMedico] = useState(0);
    const [idSituacao, setIdSituacao] = useState(0);
    const [ dataConsulta, setDataConsulta] = useState(new Date());
    const [ descricaoConsulta, setDescricaoConsulta] = useState("");

    function buscarMedicos() {
        axios("http://localhost:5000/api/Medicos", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaMedicos(resposta.data);
                }
            }).catch(erro => console.log(erro));
    }

    useEffect(buscarMedicos, [])

    function buscarPacientes() {
        axios("http://localhost:5000/api/Pacientes", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 200) {
                    setListaPacientes(resposta.data);
                }
            }).catch(erro => console.log(erro));
    }

    useEffect(buscarPacientes, []);

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
                <section className=" container listagem">
                    <h2>Listagem</h2>

                    {
                        listaConsultas.map((consulta) => {
                            console.log(consulta.idSituacaoNavigation.situacao1)
                            return (
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
                                                    <SituacaoConsulta situacao={consulta.idSituacaoNavigation.situacao1} />
                                                    <button type="button" className="vazio"><i className="far fa-edit"></i></button>
                                                </div>

                                            </div>
                                            <div className="info">
                                                <p className="chave">Data da Consulta:</p>
                                                <p className="valor">{Intl.DateTimeFormat("pt-BR", {
                                                    year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"
                                                }).format(new Date(consulta.dataConsulta))}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="informacoes_secundarias">
                                        <p className="chave">Descricao da consulta</p>
                                        <SetaBaixo />
                                    </div>
                                    <div className="descricao">
                                        <textarea name="texto_desc" id="texto_desc" className="valor vazio" style={{ resize: "none", display: "none" }}
                                            cols="86" rows="10" readOnly="">{consulta.descricaoConsulta}</textarea>
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

                <section id="cadastro" className="container cadastro">
                    <h2>Cadastro</h2>
                    <div className="container_cadastro">
                        <form className="container_cadastro">
                            <div className="inputs">
                                <div className="input_users">
                                    <div className="campo_">
                                        <label htmlFor="paciente">Paciente:</label><br />
                                        <select name="paciente" id="paciente" name="idPaciente" value={idPaciente} onChange={(campo) => setIdPaciente(campo.target.value)}>
                                            <option value="0" selected disabled>Selecione o paciente</option>
                                            {
                                                listaPacientes.map((paciente) => {
                                                    return (
                                                        <option key={paciente.idPaciente} value={paciente.idPaciente}>
                                                            {paciente.nomePaciente}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select><br />
                                    </div>
                                    <div className="campo_">
                                        <label htmlFor="medico">Medico:</label><br />
                                        <select name="medico" id="medico" name="medico" value={idMedico} onChange={(campo) =>
                                        setIdMedico(campo.target.value)}>
                                            <option value="0" selected disabled> Selecione o Medico</option>
                                            {
                                                listaMedicos.map((medico) => {
                                                    return (
                                                        <option key={medico.idMedico} value={medico.idMedico}>
                                                            {medico.nomeMedico} {medico.sobrenomeMedico}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select><br />
                                    </div>
                                    <div className="campo_">
                                        <label htmlFor="situacao">Situacao:</label><br />
                                        <select name="situacao" id="situacao" name="email" value={idSituacao} onChange={(campo) =>
                                        setIdSituacao(campo.target.value)}>
                                                <option value="0" selected disabled>Selecione a situacao</option>
                                                <option value="1" >Agendada</option>
                                                <option value="2" >Realizada</option>
                                                <option value="3" >Cancelada</option>
                                        </select><br />
                                    </div>
                                </div>
                                <div className="input_consulta">
                                    <div className="campo">
                                        <label htmlFor="data">Data da consulta</label><br />
                                        <input name="data" id="data" type="datetime-local" value={dataConsulta} onChange={(campo) =>
                                        setDataConsulta(campo.target.value)} />
                                    </div>
                                    <div className="campo">
                                        <label htmlFor="descricao">Descricao</label><br />
                                        <textarea name="descricao" id="descricao" cols="30" rows="10" value={descricaoConsulta} onChange={(campo) =>
                                        setDescricaoConsulta(campo.target.value)}></textarea>
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