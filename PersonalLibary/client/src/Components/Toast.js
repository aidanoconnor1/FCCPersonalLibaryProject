import React, {useState} from 'react'
import Alert from 'react-bootstrap/Alert'
import Toast from 'react-bootstrap/Toast'



export const Toaster = ( { message, show, successFail, autoHide } ) => {
  

  return (
    <Toast className="toast" onClose={() => autoHide()} show={show} delay={3000} autohide>
    <Toast.Header>
        <small className="ml-auto">just now...</small>
    </Toast.Header>
    <Toast.Body>
    <Alert variant={successFail} >
    {message} 
  </Alert>
  </Toast.Body>
  </Toast>
  )
}
