import { Book } from "./Book"

export interface User {
    id: string
    userName: string
    displayName: string
    token?: string
    county: string,
    image?: string,
    bio: string
}

export interface UserForm {
    email: string
    password: string
    displayName?: string
    userName?: string
    county?: string
    bio?: string
}

export interface UserBook {
    userId?: string
    displayname?: string
    userName?: string
    email?: string
    county?: string
    books?: Book[]
    swapId?: string,
    image?: string
}