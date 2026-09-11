import { act } from "react";
import { NotFoundError } from "../ErrorClasses";
import { handleResponse, objectToURLParams, requestWithRetries } from "../TokenUtils";
import * as SecureStore from "expo-secure-store"

export async function fetchUserInventoryFromServer(params,searchURL){
    const action = 'getUserInventory?'
    const urlParameters = objectToURLParams(params);
    const endpoint = `${searchURL}${action}${urlParameters}`
    console.log(endpoint)   
    const fetchFunction = async() =>{
        const token = await SecureStore.getItemAsync("accessToken")
        const response = await fetch(endpoint, {
            headers: {Authorization:`Bearer ${token}`}
        })
        return await handleResponse(response)
    }
    return await requestWithRetries(()=>fetchFunction())
}

export async function modifyInventoryRecordInServer(inventoryRecordID,modifyingParams,searchURL){
    if (!inventoryRecordID) throw new Error("Record not provided") //should never happen;
    const action = 'editCardInUserInventory'
    const endpoint = `${searchURL}${action}`
    const body={
        resource_id:inventoryRecordID,
        resource_location:"Inventory",
        ...modifyingParams
    }
    console.log(endpoint)
    const fetchFunction = async()=> {
        const token = await SecureStore.getItemAsync("accessToken")
        const response = await fetch(endpoint, {
            method:"PATCH",
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        return await handleResponse(response)
    }
    return await requestWithRetries(()=>fetchFunction())
}

export async function createInventoryRecordInServer(params,searchURL){
    const action ='addSingleCardToUserInventory'
    const endpoint = `${searchURL}${action}`
    const body = {
        resource_location:"Inventory",
        resource_id:params.cardInSetID,
        isFirstEd:params.isFirstEd,
        quantity:params.quantity
    }
    const fetchFunction = async () =>{
        const token = await SecureStore.getItemAsync("accessToken");
        const response = await fetch(endpoint, {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
    return await handleResponse(response)
    }
    return await requestWithRetries(()=>fetchFunction())
}

export async function deleteInventoryRecordInServer(params,searchURL){
    const action = 'deleteCardInUserInventory'
    const endpoint = `${searchURL}${action}`
    const body = {
        resource_id:params.inventoryRecordID,
        resource_location:"Inventory"
    }

    const fetchFunction = async () => {
        const token = await SecureStore.getItemAsync("accessToken");
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        return await handleResponse(response)
    }
    return await requestWithRetries(()=>fetchFunction())
}

export async function  deleteUsersInventoryInServer(searchURL){
    const action = 'deleteUsersInventory'
    const endpoint = `${searchURL}${action}`
    const fetchFunction = async () => {
        const token = await SecureStore.getItemAsync("accessToken");
        const response = await fetch(endpoint, {
            method:"DELETE",
            headers: {
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        })
        return await handleResponse(response)
    }
    return await requestWithRetries(()=>fetchFunction())
}