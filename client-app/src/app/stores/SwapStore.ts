import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { BookSwap } from "../models/BookSwap";
import { SwapRequests } from "../models/SwapRequests";
import { UserBook } from "../models/User";



export default class SwapStore {
    // Map of all the swaps
    swapMap = new Map<string, BookSwap>()
    selectedSwap: BookSwap | undefined = undefined

    // Map of all the swaps being requested of the current user
    requestedMap = new Map<string, SwapRequests>()
    requestDetails: SwapRequests | undefined = undefined
    // Map of all the swaps the current user is requesting
    myRequestsMap = new Map<string, SwapRequests>()
    // history of users Swaps
    historyMap = new Map<string, SwapRequests>()

    selectedRequestor: UserBook | undefined = undefined
    sumbittedSwap!: BookSwap
    editSwap = false
    loading = false
    loadingInitial = false

    constructor() {
        makeAutoObservable(this)
    }

    loadRequested = async (id: string) => {
        this.loading = true

        try {
            const requestedFromMe = await agent.Swaps.listRequested(id)
            requestedFromMe.forEach(r => {
                this.requestedMap.set(r.swapId, r)
            })
            runInAction(() => this.loading = false)
        } catch (error) {
            console.log(error)
            runInAction(() => this.loading = false)
        }
    }

    loadMyRequests = async (id: string) => {
        this.loadingInitial = true

        try {
            const myRequests = await agent.Swaps.listMyRequests(id)
            myRequests.forEach(r => {
                this.myRequestsMap.set(r.swapId, r)
            })
            runInAction(() => this.loading = false)

        } catch (error) {
            console.log(error)
            runInAction(() => this.loading = false)
        }
    }

    loadHistory = async (id: string) => {
        this.loading = true

        try {
            const history = await agent.Swaps.listHistory(id)
            history.forEach(h => {
                this.historyMap.set(h.swapId, h)
            })
            runInAction(() => this.loading = false)

        } catch (error) {
            console.log(error)
            runInAction(() => this.loading = false)
        }
    }

    loadSwaps = async () => {
        this.setLoadingInitial(true)
        try {
            const swaps = await agent.Swaps.list()
            swaps.forEach(swap => {
                this.setSwap(swap)
            })
            runInAction(() => this.setLoadingInitial(false))
        } catch (error) {
            console.log(error)
            runInAction(() => this.setLoadingInitial(false))
        }
    }

    loadRequest = (id: string) => {
        return this.requestedMap.get(id)
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
                this.myRequestsMap.delete(id)
                this.requestedMap.delete(id)
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    clearSelectedSwap = () => {
        this.selectedSwap = undefined
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state
    }

    private setSwap = (swap: BookSwap) => {
        this.swapMap.set(swap.id!, swap)
    }

    setRequestDetails(request: SwapRequests) {
        this.requestDetails! = request
    }

    getSwap = (id: string) => {
        return this.swapMap.get(id)
    }

}