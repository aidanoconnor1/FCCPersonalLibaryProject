import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from './Components/NavBar'
import { Jumbo } from './Components/Jumbotron'
import { SubmitBook } from './Components/SubmitBook'
import { BookTable } from './Components/BookTable'
import { Toaster } from './Components/Toast'
import { DeleteAll } from './Components/DeleteAll'
import { AutoFill } from './Components/AutoFill'
import { SearchBook } from './Components/SearchBook'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import books from './data.json'
const axios = require('axios')

function App() {


  const [list, setList] = useState(books)
  const [edit, setEdit] = useState(false)
  const [more, setMore] = useState(false)
  const [bookTitle, setBookTitle] = useState('')
  const [editComment, setEditComment] = useState(false)
  const [editTitle, setEditTitle] = useState(false)
  const [comment, setComment] = useState('')
  const [title, setTitle] = useState('')
  const [moreComment, setMoreComment] = useState(false)
  const [dead, setdead] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastSucFail, setToastSucFail] = useState('danger')
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)


//autohide for Toast
const autoHide = () => {
  setShowToast(false)
}

//AXIOS REQUESTS 
//Get Books
useEffect(() => {

  let source = axios.CancelToken.source();
  
  console.log('going')
  axios.get('http://localhost:5000/api/books', {
    cancleToken: source.token
  })
    .then((bookList) => {
        setList(bookList.data)
   
        return () => {
          console.log('unmouting');
          source.cancel()
        }
    })
},[showToast, toastMessage, toastSucFail])

//Get 1 Book 

const searchFilter = (book) => {
  setList(list.filter(x => {
    return x.title === book
  })
  )
}

//Submit Book
const submitNewBook = () => {
  setIsLoading(true)
axios.post('http://localhost:5000/api/books', {
        title:bookTitle
}).then(() => console.log("Book Added"), setToastSucFail('success'), setShowToast(true), setToastMessage('Book Added'), setBookTitle('') ).then(() =>  setIsLoading(false))
}
// Deletes

const deleteAllBooks = () => {
  axios.delete('http://localhost:5000/api/books')
    .then(() => console.log("All Books Deleted!!!"), setToastSucFail('danger'), setShowToast(true), setToastMessage('All Books Deleted!') )
}

const deleteBook = (id) => {
  axios.delete(`http://localhost:5000/api/books/${id}`)
  .then(() => setToastSucFail('danger'), setShowToast(true), setToastMessage('Book Deleted!'))
}

// Add Edit Comments
const newComment = (id) => { 
    axios.post(`http://localhost:5000/api/books/${id}`, {
  comment:comment
}).then(() => setEdit(false), console.log('new comment added'), setToastSucFail('success'), setShowToast(true), setToastMessage('Comment Added!') )
.catch(() => console.log('joi'))
}

const commentText = (e) => {
  setComment(e.target.value)
 
}

const searchText = (e) => {
  setSearch(e.target.value)
  console.log(search)
}


  const toggleEdit = () => {
    setEdit(false)

  }

const bookText = (e) => {
  setBookTitle(e.target.value)
}

  const editSetter = (key) => {
    setComment('')
    setEdit(key)
  }

  //list all comments
   const setMoreComments = (key) => {
     setMore(key) 
   } 

  const listAllComments = () => {
    console.log('cliclick', moreComment)
    setMore(false)
  }

//AutoFill

const autoFillBooks = (arr) => {
arr.map(x => {
  axios.post('http://localhost:5000/api/books', {
        title:x.title,
        comment:x.comment
}).then(() =>  setToastSucFail('success'), setShowToast(true), setToastMessage('AutoFill Complete!'))
} )
}


  return (
    <>
    <NavBar />
    <Jumbo />
    <Toaster message={toastMessage} show={showToast} successFail={toastSucFail} autoHide={autoHide}  />
  <Container fluid>
    <Row>
  <Col xs={12} lg={4}>
    <SubmitBook bookTitle={bookTitle} bookText={bookText} submitNewBook={submitNewBook} isLoading={isLoading} />
 </Col>
 <Col xs={12} lg={4} md={{ span: 3, offset: 3 }}>
    <SearchBook search={search} searchFilter={searchFilter} searchText={searchText} />
  </Col>
  

  </Row>
  </Container>
  
<Container fluid>
  <Row md={1}>
    <Col xs={1} lg={1}>
  <div className="padd">
    <div className="butt">
    <AutoFill  autoFillBooks={autoFillBooks} books={books} />
</div>
<div className="butt"> 
    <DeleteAll className="padd" deleteAllBooks={deleteAllBooks} />
  </div>
  </div>
  </Col>
  </Row>
  </Container>
    <BookTable list={list} edit={edit} editSetter={editSetter} toggleEdit={toggleEdit} deleteBook={deleteBook} newComment={newComment} editComment={comment} setMoreComments={setMoreComments}
    moreComment={moreComment} commentText={commentText} listAllComments={listAllComments} more={more}  />
    
    </>

  );
}

export default App;
