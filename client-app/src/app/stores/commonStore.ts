import { makeAutoObservable, reaction } from "mobx";
import { ServerError } from "../models/ServerErrorr";

export default class CommonStore{
    error: ServerError | null = null
    token: string | null = window.localStorage.getItem('jwt')
    applicationLoaded = false

    constructor() {
        makeAutoObservable(this)

        reaction(() => this.token, token => {
            if (token) {
                window.localStorage.setItem('jwt', token)
            } else {
                window.localStorage.removeItem('jwt')
            }
        })
    }

    setServerError = (error: ServerError) => {
        this.error = error
    }

    setToken = (token: string | null) => {
        this.token = token
    }

    setApplicationLoaded = () => {
        this.applicationLoaded = true
    }
}