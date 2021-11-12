import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default function SetaCima(){
    return(
        <button type="button" className="vazio"><FontAwesomeIcon className="setasIcone" icon={faChevronUp} /></button>          
    )
}