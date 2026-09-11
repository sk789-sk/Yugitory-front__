import { handleResponse, objectToURLParams, requestWithRetries } from "../TokenUtils"
import * as SecureStore from "expo-secure-store"


export const getCardsFromServer = async(params,searchURL) => {
    const action = 'getAllCards?'
    const urlParameters = objectToURLParams(params)
    const endpoint = `${searchURL}${action}${urlParameters}`
    const fetchFunction = async () => {
        const response = await fetch(endpoint)
        return await handleResponse(response)
    }
    return await requestWithRetries(()=>fetchFunction())
    
}

export const getDetailedCardFromServer = async(cardID,searchURL) => {
    const action = 'getSingleCard'
    const endpoint = `${searchURL}${action}/${cardID}`
    const fetchFunction = async () => {
        const response = await fetch(endpoint)
        return await handleResponse(response)
    }
    return await requestWithRetries(()=>fetchFunction())
}