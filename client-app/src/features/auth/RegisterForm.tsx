import React, { useState } from "react";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import _ from 'lodash'
import { Button, Dropdown, Header } from "semantic-ui-react";
import CustomTextInput from "../../app/common/form/CustomTextInput";
import { useStore } from "../../app/stores/Store";
import { UserForm } from "../../app/models/User";

export default observer(function RegisterForm() {
    const { userStore } = useStore()
    const [county, setCounty] = useState("")

    const countyDefinitions = ["Antrim", "Armagh", "Carlow", "Cavan", "Clare", "Cork", "Derry", "Donegal", "Down", "Dublin",
        "Fermanagh", "Galway", "Kerry", "Kildare", "Kilkenny", "Laois", "Leitrim", "Limerick", "Longford", "Louth", "Mayo", "Meath",
        "Monaghan", "Offaly", "Roscommon", "Sligo", "Tipperary", "Tyrone", "Waterford", "Westmeath", "Wexford", "Wicklow",]

    const countyOptions = _.map(countyDefinitions, (county, index) => ({
        key: countyDefinitions[index],
        text: county,
        value: countyDefinitions[index],
    }))

    function handleDropDown(event:any, data:any) {
        setCounty(data.value)
    }

    function handleFormSubmit(user: UserForm) {
        user.county = county
        userStore.register(user)
    }

    return (
        <Formik
            initialValues={{ displayName: '', userName: '', bio: '', email: '', password: '', error: null }}
            onSubmit={(values) => handleFormSubmit(values)}

        >

            {({ handleSubmit, isSubmitting }) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as='h2' content='Register to BookSwap' color="teal" textAlign="center" />
                    <CustomTextInput name='displayName' placeholder="Display Name" />
                    <CustomTextInput name='userName' placeholder="Username" />
                    <CustomTextInput name='bio' placeholder="Bio" />
                    <Dropdown name='county' placeholder="County" search selection options={countyOptions} onChange={handleDropDown} />
                    <CustomTextInput name='email' placeholder="Email" />
                    <CustomTextInput name='password' placeholder="Password" type="password" />


                    <Button loading={isSubmitting} positive content='Register' type='submit' fluid />
                </Form>
            )}

        </Formik>
    )
})