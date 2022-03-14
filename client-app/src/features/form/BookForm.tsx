import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Image, Segment } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/Store";
import { v4 as uuid } from 'uuid'
import { Formik, Form } from "formik";
import { Book } from "../../app/models/Book";
import * as Yup from 'yup';
import CustomTextInput from "../../app/common/form/CustomTextInput";
import CustomTextArea from "../../app/common/form/CustomTextArea";



export default observer(function BookForm() {
    const history = useHistory()
    const { bookStore, userStore } = useStore()
    const {user} = userStore
    const { createBook, updateBook, loading, loadBook, loadingInitial, submittingBook } = bookStore
    const { id } = useParams<{ id: string }>()
    const [book, setBook] = useState<Book>({
        id: "",
        title: "",
        author: "",
        synopsys: "n/a",
        pages: 0,
        binding: "n/a",
        isbn13: "",
        image: "",
        county: "carlow",
        appUserId: ""
    })

    const validationSchema = Yup.object({
        title: Yup.string().required(),
        author: Yup.string().required(),
        synopsys: Yup.string().required(),
        pages: Yup.number().required(),
        binding: Yup.string().required(),
        isbn13: Yup.string().required(),
    })

    useEffect(() => {
        if (id) {
            loadBook(id).then(book => setBook(book!))
        } else {
            setBook({...submittingBook})
        }
    }, [id, loadBook, submittingBook])

    function handleFormSubmit(book: Book) {
        if (book.id!.length === 0) {
            let newBook = {
                ...book,
                id: uuid(),
                appUserId: user!.id
            }
            createBook(newBook).then(() => history.push(`/books/${newBook.id}`))
        } else {
            updateBook(book).then(() => history.push(`/books/${book.id}`))
        }
    }


    if (loadingInitial || loading) return <LoadingComponent content="Loading book..." />

    return (
        <Segment clearing>
            <Header content='Book Details' sub color="teal"/>
            <Formik
                enableReinitialize
                initialValues={book}
                onSubmit={values => handleFormSubmit(values)}
                validationSchema={validationSchema}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <Image
                            centered
                            src={book.image}
                            size="small"
                            rounded
                            placeholder='Image'
                            name='image' />
                        <CustomTextInput name='title' placeholder="Title" />
                        <CustomTextInput placeholder='Author' name='author' />
                        <CustomTextArea rows={3} placeholder='Synopsys' name='synopsys' />
                        <CustomTextInput placeholder='Pages' name='pages' />
                        <CustomTextInput placeholder='Binding' name='binding' />
                        <CustomTextInput placeholder='isbn13' name='isbn13' />
                      
                        <Button
                            disabled={isSubmitting || !isValid}
                            loading={loading}
                            floated='right'
                            positive
                            type='submit'
                            content='submit' />
                        <Button as={Link} to={`/profile/${user?.id}`} floated='right' type='button' content='cancel' />
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})