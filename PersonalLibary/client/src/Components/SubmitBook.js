import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

export const SubmitBook = ({ bookTitle, bookText, submitNewBook, isLoading }) => (

    
    <Form className="p-5">
        <Form.Group>
            <Form.Label>Submit A New Book</Form.Label>
            <Form.Control type="book" value={bookTitle} onChange={bookText} placeHolder="Enter Book Name" />
            <Form.Text className="text-muted">
            </Form.Text>
        </Form.Group>
        <Button variant="primary" type="button" onClick={submitNewBook} disabled={isLoading}>{isLoading ? 'Loading…' : 'Submit'}</Button>
    </Form>
    
)