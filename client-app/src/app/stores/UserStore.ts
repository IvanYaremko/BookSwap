import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../api/agent";
import { User, UserForm } from "../models/User";
import { store } from "./Store";

export default class UserStore {
    user: User | null = null

    constructor() {
        makeAutoObservable(this)
    }

    get checkLogin() {
        return !!this.user
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current()
            runInAction(() => this.user = user)
        } catch (error) {
            console.log(error)
        }
    }

    login = async (values: UserForm) => {
        try {
            const user = await agent.Account.login(values)
            store.commonStore.setToken(user.token)
            runInAction(() => this.user = user)
            history.push('/books')
            store.modalStore.closeModal()
        } catch (error) {
            throw error
        }
    }

    logout = () => {
        store.commonStore.setToken(null)
        window.localStorage.removeItem('jwt')
        this.user = null
        history.push('/')
    }

    register = async (values: UserForm) => {
        try {
            const user = await agent.Account.register(values)
            store.commonStore.setToken(user.token)
            runInAction(() => this.user = user)
            history.push('/books')
            store.modalStore.closeModal()
        } catch (error) {
            throw error
        }
    }


}