import { createContext, useContext } from "react";
import BookStore from "./BookStore";
import CommonStore from "./commonStore";
import ModalStore from "./ModalStore";
import UserStore from "./UserStore";

interface Store {
    bookStore: BookStore
    commonStore: CommonStore
    userStore: UserStore
    modalStore: ModalStore
}

export const store : Store = {
    bookStore: new BookStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}