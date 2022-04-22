import { observer } from "mobx-react-lite";
import BookStore from "../../../app/stores/BookStore";
import ProfileStore from "../../../app/stores/ProfileStore";
import { useStore } from "../../../app/stores/Store";

export default observer(function ProfileBooksOwned() {
    const { bookStore } = useStore()
    const { booksOwnedMap} = bookStore
    return (
        <>
            <h3>{Array.from(booksOwnedMap.values()).length}</h3>
        </>
    )
})