import { observer } from "mobx-react-lite";
import { Tab } from "semantic-ui-react";
import ProfileDetails from "./ProfileDetails";
import ProfileOwnedBooks from "./ProfileOwnedBooks";
import ProfilePhotos from "./ProfilePhotos";

/**
 * 
 */
export default observer(function ProfileContent() {
    const panes = [
        { menuItem: 'Details', render: () => <ProfileDetails /> },
        { menuItem: 'Books', render: () => <ProfileOwnedBooks/> },
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