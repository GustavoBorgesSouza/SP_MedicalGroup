import "../../assets/css/estiloHome.css"
import Cabecalho from "../../components/cabecalho/cabecalho"
import Rodape from "../../components/rodape/rodape"

import Fernando from "../../assets/img/fernando_strada.png"

import Dinheiro from "../../components/icones/dinheiro"
import Estetoscopio from "../../components/icones/estetoscopio"
import Like from "../../components/icones/like"


export default function Home() {
    return (
        <div>
            <Cabecalho />
            <main>

                <section className="container_banner">
                    <div className="main_banner">
                        <h1 className="titulo_banner">Conheça a clinica que melhor atende suas necessides</h1>
                        <p className="subtitulo_banner">A clinica nova e moderna, que trás de tudo do melhor para seus pacientes e
                            médicos.</p>
                        <button className="botao_banner"><a className="botao_banner" href="#sobre">sobre nós</a></button>
                    </div>
                    <div id="sobre" className="arrumar">
                        <div className="divulgacao_banner">
                            <div className="bloco">
                                <Dinheiro />
                                <span>precos acessíveis</span>
                            </div>
                            <div className="bloco">
                                <Estetoscopio />
                                <span>profissionais qualificados</span>
                            </div>
                            <div className="bloco">
                                <Like />
                                <span>clientes satisfeitos</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container container_principal">
                    <div className="sobre_content">
                        <div className="sobre_textos">
                            <h2>sobre nós</h2>
                            <p>Esta nova clínica médica chamada SP Medical Group, é uma empresa de pequeno porte que atua no
                                ramo da
                                saúde, foi idealizada e fundada pelo médico Fernando Strada em meados 2020 durante a pandemia,
                                visto
                                que era necessário atendimentos melhores, com qualidade e preço acessíveis para toda a população
                                paulista, surgiu na região da
                                Paulista em São Paulo e desde então se espalhou pelo estado.</p>
                        </div>
                        <img src={Fernando} alt="Imagem do médico fundador, Fernando Strada" />
                    </div>
                    <div id="especialidades">
                        <h2>serviços</h2>
                        <p>A partir do iminente sucesso, a necessidade de expansão chega. Novas clinicas estão sendo construídas
                            para fazerem parte do grupo SP Medical e outras já estão planejando futuras parcerias para o avanço
                            da sáude, todos os equipamentos são de alta qualidade e ambientes que agradam a todos, desde os mais
                            jovens aos mais velhos, e pensando nisso a variedade de serviços prestados também aumentou, veja
                            aqui algumas das nossas áreas de serviço e especialidades:</p>
                    </div>
                    <div className="especialidades">
                        <div className="lista">
                            <ul>
                                <li>Cardiologia</li>
                                <li>Radioterapia</li>
                                <li>Pediatria</li>
                                <li>Angiologia</li>
                                <li>Cirurgia geral</li>
                            </ul>
                        </div>
                        <div className="lista">
                            <ul>
                                <li>Dermatologia</li>
                                <li>Urologia</li>
                                <li>Psiquiatria</li>
                                <li>Anestesiologia</li>
                                <li>Cirurgia cardiovascular</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </main>

            <Rodape />

        </div>
    )
}