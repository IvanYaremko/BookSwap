import { Book } from "./Book";
import { User, UserBook } from "./User";

export interface SwapHistory {
    swapId: string
    requesteeUser: UserBook
    requestorUser: UserBook
    requesteeBook: Book
    reqeustorBook: Book
}