import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'

export default function SetaBaixo(){
    return(
        <button type="button" className="vazio"><FontAwesomeIcon className="setasIcone" icon={faChevronDown} /></button>          
    )
}