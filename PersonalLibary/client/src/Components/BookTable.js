import React, { useState } from 'react'
import { Table, Button, Form, FormControl, InputGroup, Badge, Collapse, Container } from 'react-bootstrap'
import { faPenSquare, faMinusCircle, faTimes, faCheck, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const DeleteButton = ({ _id, deleteBook }) => (
    <Button type="button" variant="" onClick={() => deleteBook(_id)}>
        <FontAwesomeIcon className="delete" icon={faMinusCircle} />
    </Button>
)

const EditButton = ({ _id, editSetter }) => (
    <Button type="button"  variant="Warning" onClick={() => editSetter(_id)}>
        <FontAwesomeIcon  className="edit" icon={faPenSquare} />
        </Button>
)


const EditComment = ({ toggleEdit, _id, newComment, editComment, commentText }) => {
    return (
        <InputGroup>
        <FormControl onChange={commentText} value={editComment} className="textbox" />
         <InputGroup.Append>
             <Button variant="success">
                 <FontAwesomeIcon  className="" icon={faCheck} onClick={() => newComment(_id)} />
             </Button>
             <Button variant="danger">
                 <FontAwesomeIcon  className="" icon={faTimes} onClick={() => toggleEdit()} />
             </Button>
         </InputGroup.Append>
        </InputGroup>
    )
}

const TableRow = ( { _id, title, comment, commentCount,  edit, editSetter, toggleEdit, deleteBook, newComment, editComment, commentText, moreComment, listAllComments, more, setMoreComments }) => {
   
 
    if (edit === _id) {
       return ( 
<TableRowEditMode _id={_id} title={title} comment={comment} commentCount={commentCount} edit={edit} editSetter={editSetter} toggleEdit={toggleEdit} deleteBook={deleteBook} newComment={newComment} editComment={editComment} commentText={commentText} />
       )} else if (more === _id) {
       return (
    <TableRowMore moreComment={moreComment} setMoreComments={setMoreComments}  _id={_id} title={title} comment={comment} commentCount={commentCount} edit={edit} editSetter={editSetter} toggleEdit={toggleEdit} deleteBook={deleteBook} listAllComments={listAllComments} newComment={newComment} editComment={editComment} commentText={commentText} />
       )}
       else {
           return (
               <TableRowNormall moreComment={moreComment} setMoreComments={setMoreComments}  _id={_id} title={title} comment={comment} commentCount={commentCount} edit={edit} editSetter={editSetter} toggleEdit={toggleEdit} deleteBook={deleteBook} listAllComments={listAllComments} newComment={newComment} editComment={editComment} commentText={commentText} />
           )
       }
}

const TableRowNormall = ( { _id, title, comment, commentCount, editSetter, deleteBook, setMoreComments } ) => {
    return (
        <>
        <tr>
        <td>{_id}</td>
        <td>{title}</td>
        {commentCount <= 1 ? <td>{comment[0]}</td> :    
        <td>{comment[0]} <button className="morebutton" onClick={() => setMoreComments(_id)}><Badge pill className="morepill" variant="info"> See More ({commentCount-1}) <FontAwesomeIcon  className="" icon={faCaretDown} /> </Badge></button></td>
            }
        <td><EditButton _id={_id} editSetter={editSetter}  /></td>
        <td><DeleteButton _id={_id} deleteBook={deleteBook} /></td>
        
    </tr>
    </>

    )
}

const TableRowEditMode = (  { _id, title, comment, editSetter, toggleEdit, deleteBook, newComment, editComment, commentText } ) => {
    return (
    <tr>
    <td>{_id}</td>
    <td>{title}</td>
    <td><EditComment toggleEdit={toggleEdit} newComment={newComment} _id={_id} comment={comment} editComment={editComment} commentText={commentText} /></td>
    <td><EditButton editSetter={editSetter}  /></td>
    <td><DeleteButton deleteBook={deleteBook} /></td>
</tr>
    )
}

const TableRowMore = ( {moreComment, _id, title, comment, commentCount,   editSetter,  deleteBook,  listAllComments, setMoreComments } ) => {
    const commentList = comment.map((x,i) =>{
        if(i > 0){
        return (
            <tr>
            <td></td>
            <td></td>
            <td>{x}</td>
            <td></td>
            <td></td>
        </tr>
            
        )
        } else {
        
            return (
            <tr>
                <td>{_id}</td>
                <td>{title}</td>
                <td>{comment[0]} <button className="morebutton" onClick={() => listAllComments()}><Badge pill className="morepill" variant="info">Hide More ({commentCount-1})   <FontAwesomeIcon  className="" icon={faCaretUp} /> </Badge></button></td>
                <td><EditButton _id={_id} editSetter={editSetter}  /></td>
                <td><DeleteButton _id={_id} deleteBook={deleteBook} /></td>               
            </tr>
        )
        }
    })
    return(
        <>  
        {commentList}
        </>
    )
}

export const BookTable = ({ list, edit, editSetter, toggleEdit, deleteBook, newComment, editComment, commentText, moreComment, listAllComments, more, setMoreComments }) => {


    const mappedList = list.map(x => {
        
                return (      
<TableRow _id={x._id} title={x.title} comment={x.comment} commentCount={x.commentCount} edit={edit} editSetter={editSetter} 
toggleEdit={toggleEdit} deleteBook={deleteBook} newComment={newComment} editComment={editComment} commentText={commentText}  moreComment={moreComment} listAllComments={listAllComments} more={more} setMoreComments={setMoreComments} />
        )
    })

    return (
        <Container fluid>
        <Table striped border hover>
            <thead>
                <th>#</th>
                <th>Book Name</th>
                <th>Comment</th>
                <th>Add Comment</th>
                <th>Delete</th>
            </thead>
            <tbody>
                    {mappedList}
            </tbody>
        </Table>
        </Container>
    )
}