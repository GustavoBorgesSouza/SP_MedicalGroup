export default function SituacaoConsulta(situacao) {
    // console.log(situacao)

    switch (situacao.situacao) {
        case "Agendada":
            return (
                <div>
                    <select id={situacao.idConsulta} defaultValue="1" className="status vazio" name="status" disabled onChange={situacao.mudar}>
                    <option value="1">Agendada</option>
                    <option value="2" >Realizada</option>
                    <option value="3">Cancelada</option>
                    </select>
                </div>
            )
        case 'Realizada':
            return (
                <div>
                    <select id={situacao.idConsulta} defaultValue="2" className="status vazio" name="status" disabled onChange={situacao.mudar}>
                    <option value="1" >Agendada</option>
                    <option value="2" >Realizada</option>
                    <option value="3">Cancelada</option>
                    </select>
                </div>
            )
        case "Cancelada":
            return (
                <div>
                    <select id={situacao.idConsulta} defaultValue="3" className="status vazio" name="status" disabled onChange={situacao.mudar}>
                    <option value="1" >Agendada</option>
                    <option value="2" >Realizada</option>
                    <option value="3" >Cancelada</option>
                    </select>
                </div>
            )

        default:
            return(
                <div>
                    <select id={situacao.idConsulta} className="status vazio" name="status" disabled onChange={situacao.mudar}>
                    <option value="1" >Agendada</option>
                    <option value="2" >Realizada</option>
                    <option value="3" >Cancelada</option>
                    </select>
                </div>
            )

    }


}
