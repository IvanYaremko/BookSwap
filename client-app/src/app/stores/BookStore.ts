import { makeAutoObservable,  runInAction } from "mobx"
import agent from "../api/agent"
import { Book } from "../models/Book"
import {v4 as uuid} from 'uuid'

export default class BookStore {
    bookMap = new Map<string, Book>()
    selectedBook: Book | undefined = undefined
    editMode = false
    loading = false
    loadingInitial = true

    constructor() {
        makeAutoObservable(this)
    }

    get books() {
        return Array.from(this.bookMap.values())
    }

    loadBooks = async () => {
        try {
            const books = await agent.Books.list()

            books.forEach(book => {
                this.bookMap.set(book.id, book)
            })
            this.setLoadingInitial(false)

        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }

    selectBook = (id: string) => {
        this.selectedBook = this.bookMap.get(id)
    }

    cancelSelectedBook = () => {
        this.selectedBook = undefined
    }

    openForm = (id?: string) => {
        id ? this.selectBook(id) : this.cancelSelectedBook()
        this.editMode = true
    }

    closeForm = () => {
        this.editMode = false
    }

    createBook = async(book: Book) => {
        this.loading = true
        book.id = uuid()
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
                if(this.selectedBook?.id === id) this.cancelSelectedBook()
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