import React, { useState } from 'react'
import { Jumbotron, Button, Collapse } from 'react-bootstrap'

export const Jumbo =  () => {
const [open, setOpen] = useState(false)
const showHide = open ? "Hide" : "Show"
return (
    <Jumbotron >
        <h2 >Personal Libary Project</h2>
        <p>A Simple Personal Libary Project for FreeCodeCamp's Advanced Express And Node Certficate</p>
      
        <Button
        onClick={() => setOpen(!open)}
        
      >
        {showHide} Resources
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
         <ul>
             <li>NodeJS</li>
             <li>React</li>
             <li>Bootstrap</li>
             <li>ExpressJS</li>
             <li>Mongoose</li>
             <li>MongoDB</li>
             <small>Testing With Chai and Mocha. Secuity With HelmetJS</small>
             
         </ul>
        </div>
      </Collapse>
    </Jumbotron>

)
        }

        