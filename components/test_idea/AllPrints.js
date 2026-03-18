import { isEventEnabled } from "@testing-library/react-native/build/fire-event";
import { canUseBiometricAuthentication } from "expo-secure-store";
import React, {useState, useEffect} from "react";
import { View, Button, TextInput, Image, FlatList, StyleSheet, Text} from "react-native";
// component creates all of the printings and rarities based on the card id

// First get the data 


const AllPrints = ({cardID}) => {
    const [cardPrintData, setCardPrintData] = useState([])

    //10276 to test for cardid
    //Get datafunction useEffect()
    //setCardData
    useEffect(() => {
        const fetchCardData = async() => {
            try{
                const resp = await fetch(`http://ec2-3-135-192-227.us-east-2.compute.amazonaws.com:8000/cards/getSingleCard/10276`); //${cardID}
                const data = await resp.json()
                setCardPrintData(data.card_in_set);
                console.log(data)
                console.log(cardPrintData)
                console.log(data.card_in_set)
            }
            catch(error){
                console.log("Error getting data", error)
            }
        }
        fetchCardData()
    }, [cardID])

    const handleSubmit =() =>{
        console.log('hehexd')
    }

    //Iterate over the cardData to create each view. Card will have images, Set, Rarity, Add Button
    const renderRow = ({item}) => {

        return(
        <View>
            {/* <Image></Image> src item.img or something */}
            <Text>{item.card_code}</Text>
            <Text>{item.rarity}</Text>
            <Text>test</Text>
            <Button title = 'Add'></Button>
            <TextInput keyboardType='numeric' placeholder="hold" onPress={handleSubmit}></TextInput>
        </View>
        )
    }

    return (
        <View>
            {/*Table Body*/}
            <FlatList 
                data={cardPrintData}
                renderItem={renderRow}
                // keyExtractor = {something with cardinSetid prob}
            />
            <Button title = 'hiya'></Button>
        </View>
    );
}

const styles = StyleSheet.create({
    headerCell: {},
    bodyCells: {},
    row: {}
})


export default AllPrints