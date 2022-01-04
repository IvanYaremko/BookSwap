import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/Store";
import {v4 as uuid} from 'uuid'



export default observer(function BookForm() {
    const history = useHistory()
    const { bookStore } = useStore()
    const { createBook, updateBook, loading, loadBook, loadingInitial } = bookStore
    const {id} = useParams<{id: string}>()
    const [book, setBook] = useState({
        id: "",
        title: "",
        author: "",
        synopsys: "",
        pages: 0,
        binding: "",
        isbn13: "",
        image: "",
    })

    useEffect(() => {
        if(id) loadBook(id).then(book => setBook(book!))
    }, [id, loadBook])

    function handleSubmit() {
        if (book.id.length === 0) {
            let newBook = {
                ...book,
                id: uuid()
            }
            createBook(newBook).then(() => history.push(`/books/${newBook.id}`))
        } else {
            updateBook(book).then(() => history.push(`/books/${book.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target
        setBook({...book, [name]: value})
    }

    if(loadingInitial) return <LoadingComponent content="Loading book..." />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autocomplete='off'>
                <Form.Input placeholder='Image' value={book.image} name='image' onChange={handleInputChange} />
                <Form.Input placeholder='Title' value={book.title} name='title' onChange={handleInputChange} />
                <Form.Input placeholder='Author' value={book.author} name='author' onChange={handleInputChange} />
                <Form.TextArea placeholder='Synopsys' value={book.synopsys} name='synopsys' onChange={handleInputChange} />
                <Form.Input placeholder='Pages' value={book.pages} name='pages' onChange={handleInputChange} />
                <Form.Input placeholder='Binding' value={book.binding} name='binding' onChange={handleInputChange} />
                <Form.Input placeholder='isbn13' value={book.isbn13} name='isbn13' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='submit' />
                <Button as={Link} to='/books' floated='right' type='button' content='cancel' />
            </Form>
        </Segment>
    )
})