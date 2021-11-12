
export default function SituacaoConsulta(situacao) {
    console.log(situacao)

    switch (situacao.situacao) {
        case "Agendada":
            return (
                <div>
                    <select className="status vazio" name="status" id="status" disabled>
                    <option value="1" selected>Agendada</option>
                    <option value="2" >Realizada</option>
                    <option value="3">Cancelada</option>
                    </select>
                </div>
            )
            break;
        case 'Realizada':
            return (
                <div>
                    <select className="status vazio" name="status" id="status" disabled>
                    <option value="1" >Agendada</option>
                    <option value="2" selected>Realizada</option>
                    <option value="3">Cancelada</option>
                    </select>
                </div>
            )
            break;
        case "Cancelada":
            return (
                <div>
                    <select className="status vazio" name="status" id="status" disabled>
                    <option value="1" >Agendada</option>
                    <option value="2" >Realizada</option>
                    <option value="3" selected>Cancelada</option>
                    </select>
                </div>
            )
            break;

        default:
            return(
                <div>
                    <select className="status vazio" name="status" id="status" disabled>
                    <option value="1" >Agendada</option>
                    <option value="2" >Realizada</option>
                    <option value="3" >Cancelada</option>
                    </select>
                </div>
            )
            break;
    }


}
