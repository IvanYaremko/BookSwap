import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Book } from "../../app/models/Book";

interface Props {
    book: Book | undefined
    closeForm: () => void
    createOrEdit: (book: Book) => void
    submitting: boolean
}

export default function BookForm({ book: selectedBook, closeForm, createOrEdit, submitting }: Props) {
    
    const initialState = selectedBook ?? {
        id: "",
        title: "",
        author: "",
        synopsys: "",
        pages: 0,
        binding: "",
        isbn13: "",
        image: "",
    }

    const [book, setBook] = useState(initialState)

    function handleSubmit() {
        createOrEdit(book)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target
        setBook({...book, [name]: value})
    }

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
                <Button loading={submitting} floated='right' positive type='submit' content='submit' />
                <Button onClick={closeForm} floated='right' type='button' content='cancel' />
            </Form>
        </Segment>
    )
}