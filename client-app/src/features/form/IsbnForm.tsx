import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Button, Form, Segment } from "semantic-ui-react";
import CustomTextInput from "../../app/common/form/CustomTextInput";
import { useStore } from "../../app/stores/Store";
import { Book } from "../../app/models/Book";
import { Link, useHistory } from "react-router-dom";

export default observer(function IsbnForm() {
    const isbn = { isbn: "" }
    const history = useHistory()

    const { bookStore } = useStore()
    let { setSubmittingBook } = bookStore

    const instance = axios.create({
        baseURL: "https://api2.isbndb.com/book",
        headers: {'Authorization': '46761_da8695639d322094f5fe34bf7c7b8dae'}
    })
    

    function handleSubmit(values: any) {
        instance.get(values['isbn']).then(response => {
            const book = response.data
            let newBook: Book = {
                id: "",
                title: book.book.title,
                author: book.book.authors[0],
                synopsys: book.book.synopsys,
                pages: book.book.pages,
                binding: book.book.binding,
                isbn13: book.book.isbn13,
                image: book.book.image,
                county: "carlow"
            }
            console.log(newBook)
            setSubmittingBook(newBook)
            history.push('/edit')
        })
    }

    return (
        <Segment clearing>
            <Formik initialValues={isbn} onSubmit={(values) => handleSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <CustomTextInput placeholder='isbn' name='isbn' />
                        <Button type='submit' color='green' content='get book details' />
                    </Form>
                )}

            </Formik>
        </Segment>
    )
})