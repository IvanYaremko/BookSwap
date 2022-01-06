import axios, { AxiosError } from "axios"
import { makeAutoObservable, runInAction } from "mobx"
import { toast } from "react-toastify"
import agent from "../api/agent"
import isbnAgent from "../api/isbnAgent"
import { Book } from "../models/Book"
import { IsbnBook } from "../models/IsbnBook"

export default class BookStore {
    bookMap = new Map<string, Book>()
    selectedBook: Book | undefined = undefined
    submittingBook!: Book
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
        this.bookMap.set(book.id!, book)
    }

    private getBook = (id: string) => {
        return this.bookMap.get(id)
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }

    createBook = async (book: Book) => {
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

    setSubmittingBook = async (isbn: string) => {
        this.loading = true
        try {
            await isbnAgent.requests.get<IsbnBook>(isbn).then(response => {
                const {book} = response
                let newBook: Book = {
                    id: "",
                    title: book.title,
                    author: book.authors[0],
                    synopsys: book.synopsys,
                    pages: book.pages,
                    binding: book.binding,
                    isbn13: book.isbn13,
                    image: book.image,
                    county: "carlow"
                }
                runInAction(() => {
                    this.submittingBook = newBook
                    this.loading = false
                })
            })
        } catch (error) {
            runInAction(() => {
                this.loading = false
            })
        }
    }

}