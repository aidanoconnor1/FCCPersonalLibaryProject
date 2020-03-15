import React from 'react'
import { Button } from 'react-bootstrap'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const DeleteAll = ({ deleteAllBooks }) => {
    return (
        <Button variant="danger" onClick={deleteAllBooks} className="fill"> <FontAwesomeIcon  className="" icon={faExclamation} /> Delete All</Button>

    )
}