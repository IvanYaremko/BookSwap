import { createContext, useContext } from "react";
import BookStore from "./BookStore";
import CommonStore from "./commonStore";
import ProfileStore from "./ProfileStore";
import SwapStore from "./SwapStore";
import UserStore from "./UserStore";

interface Store {
    bookStore: BookStore
    commonStore: CommonStore
    userStore: UserStore
    swapStore: SwapStore
    profileStore: ProfileStore
}

export const store : Store = {
    bookStore: new BookStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    swapStore: new SwapStore(),
    profileStore: new ProfileStore()
}

export const StoreContext = createContext(store)

export function useStore() {
    return useContext(StoreContext)
}