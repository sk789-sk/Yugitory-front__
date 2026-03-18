import { isEventEnabled } from "@testing-library/react-native/build/fire-event";
import { canUseBiometricAuthentication } from "expo-secure-store";
import React, {useState, useEffect} from "react";
import { View, Button, TextInput, Image, FlatList, StyleSheet, Text, Modal} from "react-native";
import AllPrints from "./AllPrints";


//Skeleton component for searching a cards
//We need to handle creating additional UI componenets as needed (buttons)
//Component will handle searching the data but the controller will create the URL needed with the filters

const BaseCardSearch = () => {   //{UItoggle} prop for actual 
    const [cardSearchData, setCardSearchData] = useState([])
    const [modalVisibility,setModalVisibility] = useState(false)
    const [modalCardID,setModalCardID] = useState(null)


    const testURL = 'http://ec2-3-135-192-227.us-east-2.compute.amazonaws.com:8000/cards/getAllCards?name_partial=stardust%20dragon'
    useEffect(() => {
        const fetchCardSearch = async() => {
            try{
                const resp = await fetch(testURL);
                const data = await resp.json()
                setCardSearchData(data.cards)
                console.log(data)
            }
            catch(error){
                console.log("Error getting data", error)
            }
        }
        fetchCardSearch()
    }, [])
    const UItoggle = true;

    const handleCardPress = (cardID) =>{
        //set state to figure it out modal active and what info it needs
        setModalCardID(cardID)
        setModalVisibility(true)
    }

    const closeModal = () => {
        setModalVisibility(false)
        setModalCardID(null)
    }

    const renderRow = ({item}) => {[]
        return(
            <View>
                {/* cardData */}
                <Text>{item.name}</Text>
                <Text>{item.yg_pro_id}</Text>
                <Text>The Search ID is {item.id}</Text>
                {/*Render toggle buttons if UI toggle is on*/}
                {UItoggle && (<Button title="Edit for inv"></Button>)}
                <Button title="modal test button" onPress={()=>handleCardPress(item.id)}></Button>
            </View>
        )
    }

    return (
        <View>
            <Text>Click to view extra info i think</Text>
            <FlatList 
                data = {cardSearchData}
                renderItem={renderRow}  
                //key extractor something
            />
            <Modal visible={modalVisibility}>
                    {/* <AllPrints /> */}
                    <Text>Testing123</Text> 
                    <Text>Testing123</Text> 
                    <Text>Testing123</Text> 
                    <Button title="close the modal" onPress={()=>closeModal()}></Button>
                    <AllPrints cardID={modalCardID}></AllPrints>
            </Modal>
        </View>
    )
}

export default BaseCardSearch