/**
 * BookSwap model
 */
export interface BookSwap {
    id: string,
    ownerID: string,
    ownerBookID: string,  
    requesterID: string,
    requesterBookID: string,
    status: string
}