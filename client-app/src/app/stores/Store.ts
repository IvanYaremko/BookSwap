import { createContext, useContext } from "react";
import BookStore from "./BookStore";
import CommonStore from "./commonStore";
import SwapStore from "./SwapStore";
import UserStore from "./UserStore";

interface Store {
    bookStore: BookStore
    commonStore: CommonStore
    userStore: UserStore
    swapStore: SwapStore
}

export const store : Store = {
    bookStore: new BookStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    swapStore: new SwapStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}