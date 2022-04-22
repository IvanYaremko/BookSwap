import { Book } from "./Book";
import { Photo } from "./Profile";

export interface AppUser {
    id: string,
    county: string,
    bio: string,
    userName: string,
    displayName: string,
    email: string,
    books: Book[],
    photos: Photo[]

}

export interface SwapRequests{
    swapId: string,
    owner: AppUser
    ownerBook: Book,
    requestor: AppUser,
    requestorBook?: Book,
}