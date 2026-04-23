import Config from "react-native-config";
import { BASE_URL_ } from "../../services/AuthFunctions";
import { getCardsFromServer, getDetailedCardFromServer } from "./CardAPIfunctions";


export class CardHandler{
    //This is read 
    constructor(){
        this.serverURL = BASE_URL_
        this.resource = 'cards/'
        this.url = `${this.serverURL}${this.resource}`
    }

    async getCards(params){
        //check cards in local
        //in cards the search returns and empty array or if we know the card table in local is outdated check server
        result = await getCardsFromServer(params, this.url)
        return result
    }

    async getSingleCardDetailed(cardID){
        //getCardsDetailedInfo, check in search then 
        result = getDetailedCardFromServer(cardID,this.url)
        return result
    }

}