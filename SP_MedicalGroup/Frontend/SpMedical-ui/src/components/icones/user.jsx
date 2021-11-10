import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'

export default function User(){
    return(
            <FontAwesomeIcon className="user" icon={faUser} />
    )
}