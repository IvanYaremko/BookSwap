import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Photo, Profile } from "../models/Profile";
import { store } from "./Store";

export default class ProfileStore {
    profile: Profile | null = null
    loadingProfile = false
    isUploading = false
    isMainLoading = false

    constructor() {
        makeAutoObservable(this);
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.userName === this.profile.userName
        }
        return false
    }

    loadProfile = async (username: string) => {
        this.loadingProfile = true
        try {
            const profile = await agent.Profiles.get(username)
            runInAction(() => {
                this.profile = profile
                this.loadingProfile = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => this.loadingProfile = false)
        }
    }

    uploadPhoto = async (file: any) => {
        this.isUploading = true
        try {
            const response = await agent.Profiles.uploadPhoto(file)
            const photo = response.data
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(photo)
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.setImage(photo.url)
                        this.profile.image = photo.url
                    }
                }
                this.isUploading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => this.isUploading = false)
        }
    }

    setMain = async (photo: Photo) => {
        this.isMainLoading = true
        try {
            await agent.Profiles.setMainPhoto(photo.id)
            store.userStore.setImage(photo.url)
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true
                    this.profile.image = photo.url
                    this.isMainLoading = false
                }
            })
        } catch (error) {
            console.log(error)
            runInAction(() => this.isMainLoading = false)
        }
    }

    deletePhoto = async (photo: Photo) => {
        this.isMainLoading = true
        try {
            await agent.Profiles.deletePhoto(photo.id)
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id)
                    this.isMainLoading = false
                }
            })
        } catch (error) {
            console.log(error)
            runInAction(() => this.isMainLoading = false)
        }
    }
}