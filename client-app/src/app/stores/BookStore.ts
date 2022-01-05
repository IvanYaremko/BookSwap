import { makeAutoObservable,  runInAction } from "mobx"
import agent from "../api/agent"
import { Book } from "../models/Book"

export default class BookStore {
    bookMap = new Map<string, Book>()
    selectedBook: Book | undefined = undefined
    editMode = false
    loading = false
    loadingInitial = false

    constructor() {
        makeAutoObservable(this)
    }

    get books() {
        return Array.from(this.bookMap.values())
    }

    loadBooks = async () => {
        this.setLoadingInitial(true)
        try {
            const books = await agent.Books.list()

            books.forEach(book => {
                this.setBook(book)
            })
            this.setLoadingInitial(false)

        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    loadBook = async (id: string) => {
        let book = this.getBook(id)

        if (book) {
            this.selectedBook = book
            return book
        } else {
            this.setLoadingInitial(true)
            try {
                book = await agent.Books.details(id)
                this.setBook(book)
                runInAction(() => {
                    this.selectedBook = book
                })
                this.setLoadingInitial(false)
                return book
            } catch (error) {
                console.log(error)
                this.setLoadingInitial(false)
            }
        }
    }

    private setBook = (book: Book) => {
        this.bookMap.set(book.id, book)
    }

    private getBook = (id: string) => {
        return this.bookMap.get(id)
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }

    createBook = async(book: Book) => {
        this.loading = true
        try {
            await agent.Books.create(book)
            runInAction(() => {
                this.bookMap.set(book.id, book)
                this.selectedBook = book
                this.editMode = false
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    updateBook = async (book: Book) => {
        this.loading = true
        try {
            await agent.Books.update(book)
            runInAction(() => {
                this.bookMap.set(book.id, book)
                this.selectedBook = book
                this.editMode = false
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    deleteBook = async (id: string) => {
        this.loading = true
        try {
            await agent.Books.delete(id)
            runInAction(() => {
                this.bookMap.delete(id)
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            }) 
        }
    }

}