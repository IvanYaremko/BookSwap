import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Form, Segment } from "semantic-ui-react";
import CustomTextInput from "../../app/common/form/CustomTextInput";
import { useStore } from "../../app/stores/Store";
import { useHistory } from "react-router-dom";
import * as Yup from 'yup';


export default observer(function IsbnForm() {
    const isbn = { isbn: "" }
    const history = useHistory()

    const { bookStore } = useStore()
    let { setSubmittingBook, loading } = bookStore

    function handleSubmit(values: any) {
        setSubmittingBook(values['isbn'])
        history.push('/edit')
    }

    const validationSchema = Yup.object().shape({
        isbn: Yup.string().required()
    })

    return (
        <Segment clearing>
            <Formik
                enableReinitialize
                initialValues={isbn}
                onSubmit={(values) => handleSubmit(values)}
                validationSchema={validationSchema}>
                {({ handleSubmit, isValid, isSubmitting, dirty, values }) => (
                    <Form
                        className="ui form"
                        onSubmit={handleSubmit}
                        autoComplete='off'>
                        <CustomTextInput placeholder='isbn' name='isbn' />
                        <Button
                            disabled={isSubmitting || !isValid || !dirty }
                            loading={loading}
                            type='submit'
                            positive
                            content='get book details'
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})