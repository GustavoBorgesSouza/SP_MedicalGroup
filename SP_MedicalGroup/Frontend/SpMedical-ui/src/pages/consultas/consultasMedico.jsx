import { useState, useEffect } from "react";
import axios from "axios";
import Cabecalho from "../../components/cabecalho/cabecalho"
import Rodape from "../../components/rodape/rodape"
import SituacaoConsulta from "../../components/situacaoConsulta/situacaoConsulta";
// import SetaCima from "../../components/icones/setaCima";
// import SetaBaixo from "../../components/icones/setaBaixo";
import Editar from "../../components/icones/editar";


import "../../assets/css/consultas.css"

export default function ConsultasMedico() {
    const [listaConsultas, setListaConsultas] = useState([]);
    const [descricao, setDescricao] = useState("");


    function buscarMinhasConsultas() {
        axios("http://localhost:5000/api/Consultas/Minhas", {
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

    useEffect(buscarMinhasConsultas, []);

    function permitirTextArea(idConsulta, descricaoConsulta) {
        // console.log("Você está editando a situação da consulta " + idConsulta + "e a situação é " + idSituacao)
        setDescricao(descricaoConsulta);        
        var textoDescricao = document.getElementById("texto_desc"+ idConsulta)
        textoDescricao.removeAttribute("readOnly");

        if (textoDescricao.value === null || textoDescricao.value === "") {
            textoDescricao.value = "Consulta sem descrição";
            
        }

        if (textoDescricao.style.display === "none") {
            textoDescricao.style.display = "";
        } else{
            textoDescricao.style.display = "none";
        }

        var btn = document.getElementById("btn" + idConsulta);

        if (btn.style.display === "none") {
            btn.style.display = "";      
        } else{
            setDescricao("")
            btn.style.display = "none";
        }
        
    }

    function atualizarDescricao(idConsulta){

        axios.patch("http://localhost:5000/api/Consultas/descricao/" + idConsulta,{
            descricaoConsulta: descricao
        },{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('usuario-login')
            }
        })
        .then(resposta =>{
            if (resposta.status === 204) {
                console.log("descricao da consulta" + idConsulta + "atualizada");
                // document.getElementById(idConsulta).setAttribute("readOnly");
                var btn = document.getElementById("btn" + idConsulta)
                btn.style.display = "none";
                buscarMinhasConsultas();
                setDescricao("")
            }
        }).catch(erro => console.log(erro))
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
                                        <button onClick={() => permitirTextArea(consulta.idConsulta, consulta.descricaoConsulta)} type="button" className="vazio"><Editar /></button>                                    </div>
                                    <div className="descricao">
                                        <textarea name="texto_desc" id={"texto_desc" + consulta.idConsulta} className="vazio valor texto_desc" style={{ resize: "none", display: "none" }}
                                            cols="76" rows="3" readOnly value={descricao} onChange={(campo) => setDescricao(campo.target.value)}>{descricao}</textarea>
                                        
                                    
                                    <button onClick={() =>atualizarDescricao(consulta.idConsulta)} id={"btn" + consulta.idConsulta} className="botao" style={{display: "none"}}>Atualizar</button>
                                    </div>
                                </div>

                            )

                        })
                    }

                </section>

            </main>

            <Rodape />


        </div>
    )
}