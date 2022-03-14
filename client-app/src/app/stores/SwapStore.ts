import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { BookSwap } from "../models/BookSwap";


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
            await agent.Swaps.update(swap.id, swap.status)
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

    private getSwap = (id: string) => {
        return this.swapMap.get(id)
    }
}