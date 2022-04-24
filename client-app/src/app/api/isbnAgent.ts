import axios, { AxiosError, AxiosResponse } from "axios";
import { history } from "../..";


const instance = axios.create({
    baseURL: "https://api2.isbndb.com/book",
    headers: { 'Authorization': '46761_da8695639d322094f5fe34bf7c7b8dae' },
    
})

instance.interceptors.response.use(async response => {
    return response
}, (error: AxiosError) => {
    const { status } = error.response!
    switch (status) {
        case 404:
            history.push('/not-found')
            break
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data


const requests = {
    get: <T>(urL: string) => instance.get<T>(urL).then(responseBody),
}

const isbnAgent = {
    requests
}

/**
 * 
 */
export default isbnAgent



