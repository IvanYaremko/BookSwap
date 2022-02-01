export interface User {
    id: string
    userName: string
    displayName: string
    token: string
}

export interface UserForm {
    email: string
    password: string
    displayName?: string
    userName?: string
}