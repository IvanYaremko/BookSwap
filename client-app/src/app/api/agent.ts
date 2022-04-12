import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { Book } from "../models/Book";
import { BookSwap } from "../models/BookSwap";
import { User, UserBook, UserForm } from "../models/User";
import { store } from "../stores/Store";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api'


axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { status } = error.response!
    switch (status) {
        case 400:
            toast.error('not found')
            break
        case 401:
            toast.error('not found')
            break   
        case 404:
            toast.error('not found')
            break
        case 500:
            toast.error('not found')
            break
    }
    return Promise.reject(error)
})

axios.interceptors.request.use(config => {
    const token = store.commonStore.token
    if (token) config.headers!.Authorization = `Bearer ${token}`
    return config
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}, text?: string) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Books = {
    list: () => requests.get<Book[]>('/books'),
    details: (id: string) => requests.get<Book>(`/books/${id}`),
    create: (book: Book) => requests.post<void>('/books', book),
    update: (book: Book) => requests.put<void>(`/books/${book.id}`, book),
    delete: (id: string) => requests.del<void>(`/books/${id}`)
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserForm) => requests.post<User>('/account/login', user),
    register: (user: UserForm) => requests.post<User>('/account/register', user),
    getUserById: (id: string) => requests.get<UserBook>(`/account/${id}`)
}

const Swaps = {
    list: () => requests.get<BookSwap[]>('/swap'),
    details: (id: string) => requests.get<BookSwap>(`/swap/${id}`),
    create: (swap: BookSwap) => requests.post<void>('/swap', swap),
    update: (id: string, swap: BookSwap) => requests.put<void>(`/swap/${id}`, swap),
    delete: (id: string) => requests.del<void>(`/swap/${id}`)
}

const agent = {
    Books,
    Account,
    Swaps
}

export default agent