import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Grid, Tab } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";
import ProfileEditForm from "./ProfileEditForm";

export default observer(function ProfileDetails() {
    const { profileStore } = useStore()
    const { profile, isCurrentUser } = profileStore
    const [editMode, setEditMode] = useState(false);


    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width='16'>
                    
                    {isCurrentUser && (
                        <Button
                            floated='right'
                            basic
                            content={editMode ? 'Cancel' : 'Edit Profile'}
                            onClick={() => setEditMode(!editMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width='16'>
                    {editMode ? <ProfileEditForm setEditMode={setEditMode} /> : <span style={{ whiteSpace: 'pre-wrap' }}>{profile?.bio}</span>}
                    
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})