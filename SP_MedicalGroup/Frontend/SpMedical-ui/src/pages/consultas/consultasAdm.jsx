import { useState, useEffect } from "react";
import axios from "axios";
import Cabecalho from "../../components/cabecalho/cabecalho"
import Rodape from "../../components/rodape/rodape"
import SituacaoConsulta from "../../components/situacaoConsulta/situacaoConsulta";
import SetaCima from "../../components/icones/setaCima";
import SetaBaixo from "../../components/icones/setaBaixo";
import Editar from "../../components/icones/editar"

import "../../assets/css/consultas.css"

export default function ConsultasAdm() {
    const [listaConsultas, setListaConsultas] = useState([]);

    const [listaPacientes, setListaPacientes] = useState([]);
    const [listaMedicos, setListaMedicos] = useState([]);

    const [idPaciente, setIdPaciente] = useState(0);
    const [idMedico, setIdMedico] = useState(0);
    const [idSituacao, setIdSituacao] = useState(0);
    const [dataConsulta, setDataConsulta] = useState(new Date());
    const [descricaoConsulta, setDescricaoConsulta] = useState("");


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

    function cadastrarConsultas(evento) {
        evento.preventDefault();
        axios.post("http://localhost:5000/api/Consultas", {
            idPaciente: idPaciente,
            idMedico: idMedico,
            idSituacao: idSituacao,
            dataConsulta: dataConsulta,
            descricaoConsulta: descricaoConsulta
        }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
            .then(resposta => {
                if (resposta.status === 201) {
                    console.log("consulta cadastrada");
                    buscarConsultas();


                }
            }).catch(erro => console.log(erro))
    }

    function permitirSelect(idConsulta) {
        // console.log("Você está editando a situação da consulta " + idConsulta + "e a situação é " + idSituacao)        
        document.getElementById(idConsulta).removeAttribute("disabled");
        var btn = document.getElementById("btn" + idConsulta);

        if (btn.style.display === "none") {
            btn.style.display = "";      
        } else{
            btn.style.display = "none";
        }
        

    }

    function atualizarSituacao(idConsulta){

        axios.patch("http://localhost:5000/api/consultas/" + idConsulta,{
            idSituacao: idSituacao
        },{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(resposta =>{
            if (resposta.status === 204) {
                console.log("consulta" + idConsulta + "atualizada");
                document.getElementById(idConsulta).setAttribute("disabled", "disabled");
                var btn = document.getElementById("btn" + idConsulta)
                
                btn.style.display = "none";
                buscarConsultas();
            }
        }).catch(erro => console.log(erro))
    }

    function abrirDescricao(idConsulta){
        //mesma coisa pra desalterar select, porém com a descrição display none ou não
        document.getElementById("texto_desc" + idConsulta).setAttribute("display", "")
    }

    



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
                            // console.log(consulta.idSituacaoNavigation.situacao1)
                            return (
                                <div key={consulta.idConsulta} className=" consulta">
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
                                                    <SituacaoConsulta mudar={(campo) => setIdSituacao(campo.target.value)} idConsulta={consulta.idConsulta} situacao={consulta.idSituacaoNavigation.situacao1} />
                                                    <button onClick={() => permitirSelect(consulta.idConsulta)} type="button" className="vazio"><Editar /></button>
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
                                        <button onClick={abrirDescricao(consulta.idConsulta)} type="button" className="vazio"><SetaBaixo /></button>
                                    </div>
                                    <div className="descricao">
                                        <textarea name="texto_desc" id={"texto_desc" + consulta.idConsulta} className="valor vazio" style={{ resize: "none", display: "none" }}
                                            cols="86" rows="10" readOnly="" value={consulta.descricaoConsulta}></textarea>
                                        <button onClick={() =>atualizarSituacao(consulta.idConsulta)} id={"btn" + consulta.idConsulta} className="botao" style={{display: "none"}}>Atualizar</button>
                                    </div>
                                </div>

                            )

                        })
                    }

                </section>

                <section id="cadastro" className="container cadastro">
                    <h2>Cadastro</h2>
                    <div className="container_cadastro">
                        <form onSubmit={cadastrarConsultas} className="container_cadastro">
                            <div className="inputs">
                                <div className="input_users">
                                    <div className="campo_">
                                        <label htmlFor="paciente">Paciente:</label><br />
                                        <select name="paciente" id="paciente" value={idPaciente} defaultValue="0" onChange={(campo) => setIdPaciente(campo.target.value)}>
                                            <option value="0" disabled>Selecione o paciente</option>
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
                                        <select name="medico" id="medico" value={idMedico} defaultValue={0} onChange={(campo) =>
                                            setIdMedico(campo.target.value)}>
                                            <option value="0" disabled> Selecione o Medico</option>
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
                                        <select name="situacao" id="situacao" value={idSituacao} defaultValue="0" onChange={(campo) =>
                                            setIdSituacao(campo.target.value)}>
                                            <option  value="0" disabled>Selecione a situacao</option>
                                            <option  value="1" >Agendada</option>
                                            <option  value="2" >Realizada</option>
                                            <option  value="3" >Cancelada</option>
                                        </select><br />
                                    </div>
                                </div>
                                <div className="input_consulta">
                                    <div className="campo">
                                        <label htmlFor="data">Data da consulta</label><br />
                                        <input name="data" id="data" type="datetime-local" defaultValue={dataConsulta} onChange={(campo) =>
                                            setDataConsulta(campo.target.value)} />
                                    </div>
                                    <div className="campo">
                                        <label htmlFor="descricao">Descricao</label><br />
                                        <textarea name="descricao" id="descricao" cols="30" rows="10" value={descricaoConsulta} onChange={(campo) =>
                                            setDescricaoConsulta(campo.target.value)}></textarea>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="botao">cadastrar</button>
                        </form>
                    </div>
                </section>
            </main>

            <Rodape />


        </div>
    )
}