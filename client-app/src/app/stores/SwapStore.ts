import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Book } from "../models/Book";
import { BookSwap } from "../models/BookSwap";
import { User } from "../models/User";
import { store } from "./Store";



export default class SwapStore {
    swapMap = new Map<string, BookSwap>()
    selectedSwap: BookSwap | undefined = undefined
    sumbittedSwap!: BookSwap
    editSwap = false
    loading = false
    loadingInitial = false

    constructor() {
        makeAutoObservable(this)
    }

    get booksRequestedFromMe() {
        return null;
    }

    get booksIRequest() {
        this.setLoadingInitial(true)
        var swaps = Array.from(this.swapMap.values()).filter(swap => swap.requesterID === store.userStore.user!.id)
        console.log(store.userStore.user!.id);
        var books: Book[] = []
        swaps.forEach(swap => books.push(store.bookStore.getBook(swap.ownerBookID)!))
        this.setLoadingInitial(false)
        return books
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
        console.log(this.swapMap)
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
// need to refeactor from requesuterUser to the book the requestee has selected from the requester
    updateSwap = async (swap: BookSwap, requesterUser: User) => {
        this.loading = true
        try {
            await agent.Swaps.update(swap.id, swap.status, requesterUser.id)
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

    getSwap = (id: string) => {
        return this.swapMap.get(id)
    }

    getSwapFromBookId = (id: string) => {
        let swapArray = Array.from(this.swapMap.values()).filter(swap => swap.ownerBookID === id)
        console.log(swapArray)
        return swapArray[0]
    }
}