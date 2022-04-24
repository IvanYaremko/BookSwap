import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import CustomTextInput from "../../../app/common/form/CustomTextInput";
import { useStore } from "../../../app/stores/Store";
import * as Yup from 'yup';
import _ from 'lodash'
import { useState } from "react";
import { Button, Dropdown } from "semantic-ui-react";
import { Profile } from "../../../app/models/Profile";


interface Props {
    setEditMode: (editMode: boolean) => void;
}
/**
 * 
 */
export default observer(function ProfileEditForm({ setEditMode }: Props) {
    const { profileStore } = useStore();
    const { profile, updateProfile } = profileStore
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

    function handleUpdate(profile: Profile) {
        profile.county = county
        updateProfile(profile).then(() => {setEditMode(false)})
    }

    return (
        <>
            <Formik
            initialValues={{bio: profile!.bio, county: profile!.county, displayName: profile!.displayName, userName: profile!.userName }}
            onSubmit={values => {
                handleUpdate(values)
            }}
            validationSchema={Yup.object({
                bio: Yup.string().required(),
                county: Yup.string().required()
            })}
        >
            {({isSubmitting, isValid, dirty}) => (
                <Form className='ui form'>
                    <CustomTextInput placeholder='Display Name' name='bio' />
                        <Dropdown name='county' placeholder="County" search selection options={countyOptions} onChange={handleDropDown} defaultValue={ profile!.county }/>
                    <Button 
                        positive
                        type='submit'
                        loading={isSubmitting}
                        content='Update profile'
                        floated='right'
                        disabled={!isValid}
                    />
                </Form>
            )}
        </Formik>
        </>
    )
})