import { Message } from "../models/Message";
import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { store } from "./Store";

export default class MessageStore {
    messages: Message[] = []
    hubConnection: HubConnection | null = null

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (swapId: string) => {
        if (store.swapStore.selectedSwap) {
            this.hubConnection = new HubConnectionBuilder()
                .withUrl('http://localhost:5000/message?swapId=' + swapId, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build()
            
            this.hubConnection.start().then(() => console.log("connection started")).catch(error => console.log("error starting hub ", error))

            this.hubConnection.on("LoadMessages", (messages: Message[]) => {
                runInAction(() => {
                    messages.forEach(message => {
                        message.createdAt = new Date(message.createdAt + 'Z');
                    })
                    this.messages = messages
                })
               
            })

            this.hubConnection.on("ReceiveMessage", (message: Message) => {
                runInAction(() => {
                    message.createdAt = new Date(message.createdAt)
                    this.messages.unshift(message)
                })
            })
        }
    }

    stopHubConnection = () => {
        this.hubConnection?.stop().catch(errro => console.log("Error stopping hub", errro))
    }

    removeMessages = () => {
        this.messages = []
        this.stopHubConnection()
    }

    addMessage = async (values: any) => {
        values.swapId = store.swapStore.selectedSwap?.id

        try {
            await this.hubConnection?.invoke('SendMessage', values)
        } catch (error) {
            console.log(error)
        }
    }
}