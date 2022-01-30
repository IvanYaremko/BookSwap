import React from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import CustomTextInput from "../../app/common/form/CustomTextInput";
import { useStore } from "../../app/stores/Store";
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
    const { userStore } = useStore()

    return (
        <Formik
            initialValues={{ displayName: '', userName: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch(error => setErrors({ error }))}
           
        >

            {({ handleSubmit, isSubmitting, errors}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Register to BookSwap' color="teal" textAlign="center" />
                    <CustomTextInput name='displayName' placeholder="Display Name" />
                    <CustomTextInput name='userName' placeholder="Username" />
                    <CustomTextInput name='email' placeholder="Email" />
                    <CustomTextInput name='password' placeholder="Password" type="password" />
                    <ErrorMessage
                        name='error' render={() => <ValidationErrors errors={errors.error}/>}
                    />
                    <Button loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>
            )}

        </Formik>
    )
})