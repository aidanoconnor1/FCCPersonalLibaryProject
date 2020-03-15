import React from 'react'
import { Button } from 'react-bootstrap'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const AutoFill = ({ autoFillBooks, books }) => {
    return (
        <Button variant="success" onClick={() => autoFillBooks(books)} className="fill"> <FontAwesomeIcon  className="" icon={faCheck} />Auto Fill</Button>

    )
}