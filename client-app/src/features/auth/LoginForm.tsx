import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Header} from "semantic-ui-react";
import CustomTextInput from "../../app/common/form/CustomTextInput";
import { useStore } from "../../app/stores/Store";

export default observer(function LoginForm() {
    const {userStore} = useStore()

    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values) => userStore.login(values)}
        >

            {({ handleSubmit, isSubmitting }) => (
                <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Login to BookSwap' color="teal" textAlign="center"/>
                    <CustomTextInput name='email' placeholder="Email" />
                    <CustomTextInput name='password' placeholder="Password" type="password" />
                   
                    <Button loading={isSubmitting} positive content='Login' type='submit' fluid />
                </Form>
            )}

        </Formik>
    )
})