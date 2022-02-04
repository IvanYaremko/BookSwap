import { createContext, useContext } from "react";
import BookStore from "./BookStore";
import CommonStore from "./commonStore";
import UserStore from "./UserStore";

interface Store {
    bookStore: BookStore
    commonStore: CommonStore
    userStore: UserStore
}

export const store : Store = {
    bookStore: new BookStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}