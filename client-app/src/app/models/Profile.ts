import { User } from "./User"

export interface Profile {
    userName: string
    displayName: string
    image?: string
    photos?: Photo[]
    bio: string
}

export class Profile implements Profile {
    constructor(user: User) {
        this.userName = user.userName
        this.displayName = user.displayName
        this.image = user.image
        this.bio = user.bio
    }
}

export interface Photo {
    id: string
    url: string
    isMain: boolean
}