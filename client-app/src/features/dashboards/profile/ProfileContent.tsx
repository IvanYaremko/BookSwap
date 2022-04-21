import { observer } from "mobx-react-lite";
import { Tab } from "semantic-ui-react";
import ProfileDetails from "./ProfileDetails";
import ProfilePhotos from "./ProfilePhotos";


export default observer(function ProfileContent() {
    const panes = [
        { menuItem: 'Details', render: () => <ProfileDetails /> },
        { menuItem: 'Books', render: () => <Tab.Pane>My Books</Tab.Pane> },
        { menuItem: 'Photos', render: () => <ProfilePhotos /> },
    ]

    return (
        <>
            <Tab
                menu={{ fluid: true, vertical: true }}
                menuPosition="right"
                panes={panes}
            />
        </>
    )
})