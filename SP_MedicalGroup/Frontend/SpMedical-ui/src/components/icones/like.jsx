import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'

export default function Like(){
    return(
            <FontAwesomeIcon className="icones" icon={faThumbsUp} />
    )
}