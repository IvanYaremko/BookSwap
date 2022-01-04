import { createContext, useContext } from "react";
import BookStore from "./BookStore";
import CommonStore from "./commonStore";

interface Store {
    bookStore: BookStore
    commonStore: CommonStore
}

export const store : Store = {
    bookStore: new BookStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}