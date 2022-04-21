import { observer } from "mobx-react-lite";
import { Tab } from "semantic-ui-react";
import { useStore } from "../../../app/stores/Store";

export default observer(function ProfileDetails() {
    const { profileStore } = useStore()
    const { profile, isCurrentUser } = profileStore

    return (
        <Tab.Pane>
            <h1>{profile?.bio}</h1>
        </Tab.Pane>
    )
})