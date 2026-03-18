import React, { useState } from "react";
import * as SecureStore from "expo-secure-store"; 
import { Button, ScrollView, Touchable, View } from "react-native";
import { BASE_URL_, getNewAccessToken, getUserId, isTokenExpired, storeTokens } from "../services/AuthFunctions";


// Ok if I am reconciling the data what is my goal.
// I want to have the cards from the decks and the cards that are In the users inventory.
// Step 1 gather the deck_id then gather the cards in the decks (This can be from the cloud or the local db later, just)
// Step 2 gather the cards from the users inventory (Can also be from the cloud of the local db)
// Either determine the cards that need to in app or get the response 
//infinite scroll also 
// flatlist for data


async function reconcileSelectedDecks_Server(deck_id_list){
    // return the data that will be needed to render
    // get the list of decks 
    // Make Req to API
    // Return data is stored in state
    // if token is expired run the function to update it and return the new token
    //if the response is ok
    // I should probably wrap this stuff in try/except? 
    // deck_id_list can be stored in state i guess
    try {
        let accessToken = await SecureStore.getItemAsync("accessToken");
        if (isTokenExpired()){
            //getnewToken and set it
            //if failure to get the token retry and fail after x times and throw err. 
            // this should be 1 seperate function since it will be repeated
            token = await getNewAccessToken()
            accessToken = token 
            console.log('ice cream')
        }
        
        const response = await fetch(
          `${BASE_URL_}/reconcileInventory` , 
          {
            method: "POST",
            headers: { "Authorization": `Bearer ${accessToken}`, "Content-Type":"application/json",
            "Accept":"application/json"
            },
            body: JSON.stringify(deck_id_list)
          }  
        )
        if(response.ok) {
            data = response.json()
            return data 
        }
        else{
            console.log(response.status)
            console.log(response.statusText)
        }        
    } catch (error) {
        console.error("Err",error)
        throw error
    }
}

function reconcileSelectedDecks_Local(deck_id_list){}



// const renderRows = data_obj.map( val => {
// // We are passed in the objects that contain the information that we want to render. This functino will take each object and then return the corresponding row that is associated with the object
//     // 'name' :card_name,
//     // 'id' : card_id,
//     // 'owned' : cards_owned_quantity,
//     // 'required' : quantity,
//     // 'need' : card_quantity_needed,
//     // 'usage' : cards_by_deck[card_id]
// //
// //Each row would need its own color for color coding. We can do that by having different classes that are associated with different colors and then assign the class depending on the CardNeedInfo. 

// return (
//         <View> 
//             <Text>CardNameInfo</Text>
//             <Text>CardOwnedInfo</Text>
//             <Text>CardRequiredInfo</Text>
//             <Text>CardNeedInfo</Text>
//             <Text>CardUsageInfo</Text>
//         </View>

// )
// })
    


const Reconcil = () => {

    const [allCards, setAllCards] = useState({ cards: [] });
    const  [selectedDecks, setSelectedDecks] = useState([])


    return (
        <ScrollView>
            <Button title="recon_test" onPress={reconcileSelectedDecks_Server} />
        </ScrollView>
    )
}



export default Reconcil