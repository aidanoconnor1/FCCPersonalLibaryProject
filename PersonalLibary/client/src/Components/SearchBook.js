import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'

export const SearchBook = ({ search, searchText, searchFilter }) => (

    
    <Form className="p-5">
        <Form.Group>
            <Form.Label>Search For a Book</Form.Label>
            <Form.Control type="book" value={search} onChange={searchText} placeHolder="Enter Book Name" />
            <Form.Text className="text-muted">
            </Form.Text>
        </Form.Group>
        <Button variant="primary" type="button" onClick={() => searchFilter(search)}>Search</Button>
    </Form>

)