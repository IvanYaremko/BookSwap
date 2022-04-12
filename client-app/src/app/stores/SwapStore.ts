import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Book } from "../models/Book";
import { BookSwap } from "../models/BookSwap";
import { User, UserBook } from "../models/User";
import { store } from "./Store";



export default class SwapStore {
    swapMap = new Map<string, BookSwap>()
    requestorMap = new Map<string, UserBook>()
    selectedSwap: BookSwap | undefined = undefined
    selectedRequestor: UserBook | undefined = undefined
    sumbittedSwap!: BookSwap
    editSwap = false
    loading = false
    loadingInitial = false
    swapDetails:Boolean = false

    constructor() {
        makeAutoObservable(this)
    }

    get booksRequestedFromMe() {
        let requestorArray = Array.from(this.requestorMap.values())
        return requestorArray
    }

   
    get booksIRequest() {
        this.setLoadingInitial(true)
        var swaps = Array.from(this.swapMap.values()).filter(swap => swap.requesterID === store.userStore.user!.id && swap.status === "request")
        var books: Book[] = []
        swaps.forEach(swap => books.push(store.bookStore.getBook(swap.ownerBookID)!))
        this.setLoadingInitial(false)
        return books
    }

    loadRequestors = async () => {
        this.setLoadingInitial(true)
        try {
            const mySwaps = Array.from(this.swapMap.values()).filter(swap => swap.ownerID === store.userStore.user!.id && swap.status === "request")
            mySwaps.forEach(swap => {
                let userBook = this.loadUserWithBook(swap.requesterID);
                userBook.then(values => {
                    values!.swapId = swap.id
                    this.setRequestorSwap(values!)
                })
            })
            this.setLoadingInitial(false)
        }catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    loadUserWithBook = async (id: string) => {
        return await store.userStore.getUserById(id);
    }


    loadSwaps = async () => {
        this.setLoadingInitial(true)
        try {
            const swaps = await agent.Swaps.list()
            swaps.forEach(swap => {
                this.setSwap(swap)
            })
            this.setLoadingInitial(false)

        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
    }

    loadSwap = async (id: string) => {
        let swap = this.getSwap(id)

        if (swap) {
            this.selectedSwap = swap
            return swap
        } else {
            this.setLoadingInitial(true)
            try {
                swap = await agent.Swaps.details(id)
                this.setSwap(swap)
                runInAction(() => {
                    this.selectedSwap = swap
                })
                this.setLoadingInitial(false)
                return swap
            } catch (error) {
                console.log(error)
                this.setLoadingInitial(false)
            }
        }
    }

    createSwap = async (swap: BookSwap) => {
        this.loading = true
        try {
            await agent.Swaps.create(swap)
            runInAction(() => {
                this.swapMap.set(swap.id, swap)
                this.selectedSwap = swap
                this.editSwap = false
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    updateSwap = async (swap: BookSwap) => {
        this.loading = true
        try {
            await agent.Swaps.update(swap.id, swap)
            runInAction(() => {
                this.swapMap.set(swap.id, swap)
                this.selectedSwap = swap
                this.editSwap = false
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    deleteSwap = async (id: string) => {
        this.loading = true
        try {
            await agent.Swaps.delete(id)
            runInAction(() => {
                this.swapMap.delete(id)
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }

    private setSwap = (swap: BookSwap) => {
        this.swapMap.set(swap.id!, swap)
    }

    private setRequestorSwap = (user: UserBook) => {

        this.requestorMap.set(user.userId!, user)
    }
    
    setRequestor = (id: string) => {
        this.selectedRequestor = this.requestorMap.get(id)
    }

    getSwap = (id: string) => {
        return this.swapMap.get(id)
    }

    
    getSwapFromBookId = (id: string) => {
        let swapArray = Array.from(this.swapMap.values()).filter(swap => swap.ownerBookID === id)
        console.log(swapArray)
        return swapArray[0]
    }

    setSwapDetails(value: boolean) {
        this.swapDetails = value
    }
}