import { BASE_URL_ } from "../../services/AuthFunctions";
import { createInventoryRecordInServer, deleteInventoryRecordInServer, deleteUsersInventoryInServer, fetchUserInventoryFromServer, modifyInventoryRecordInServer } from "./InventoryAPIfunctions";

export class InventoryHandler{
    //Add
    constructor(){
        this.serverURL = BASE_URL_
        this.resource = 'inventory/'
        this.url = `${this.serverURL}${this.resource}`
        this.controllers = {}
    }

    async getInventory(params){
        //localfirst
        //params should just have variable items imo
        result = fetchUserInventoryFromServer(params,this.url)
        return result
    }

    async createInventoryRecord(params){
        print(params)
        result = createInventoryRecordInServer(params,this.url)
        return result
    }
    
    async modifyInventoryRecord(invId,params){
        console.log('in class mod')

        result = modifyInventoryRecordInServer(invId,params,this.url)
        return result
    }

    async deleteInventoryRecord(params){
        console.log('in class delete')
        result = deleteInventoryRecordInServer(params,this.url)
        return result
    }


    async deleteInventory(){
        const result = await deleteUsersInventoryInServer(this.url)
        return result
    }

}

