import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";


//1. Load the initial Data to the screen using a flatlist
//2. Upon reaching the end of the flatlist run a function that will load more data
//3. Render the new data to the screen

//Inventory should be passed the url from the search component

//http://ec2-3-135-192-227.us-east-2.compute.amazonaws.com:8000/cards/getAllCards?name_partial=Blackwing&page=2

baseQueryURL = 'http://ec2-3-135-192-227.us-east-2.compute.amazonaws.com:8000/cards/getAllCards?name_partial=Blackwing'

const TestInventory = () => { //baseQueryURL is a prop with the url+ filters passed to it
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);   

    baseQueryURL = 'http://ec2-3-135-192-227.us-east-2.compute.amazonaws.com:8000/cards/getAllCards?name_partial=Blackwing'


    useEffect(() => {
        setCards([]);
        setPage(1);
        fetchData(1)

    }, [baseQueryURL])

    const fetchData = async () => {

        if (loading || !hasMore) return; //prevents api request if one is already loading or if there is no more data to load
        setLoading(true); 

        try {
            const response = await fetch(`${baseQueryURL}&page=${page}&perPage=${perPage}`);   
            if (response.ok) {
                const data = await response.json();                
                setCards((oldCards) => [...oldCards, ...data.cards]);

                if (data.cards.length < perPage) {
                    setHasMore(false);
                }else {
                    setPage(page => page+1);
                }
            } else {
                console.error("Error" ,response.statusText)
            }
        }
        catch(error){
            console.error("Error fetching cards:", error);
        }
        finally{
            setLoading(false);
        }
    }

    const renderItem = ({item}) => (
        <View>
            <Text>This is a Card</Text>
            <Text>{item.name}</Text>
            <Text>{item.yg_pro_id}</Text>
        </View>
    )

    const renderActivityIndicator = () => {
        if (!loading) return null;
        return(
            <View> 
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
return (
    <FlatList 
        data = {cards}
        // keyExtractor = {} something with id probably
        renderItem={renderItem}
        onEndReached={fetchData}
        onEndReachedThreshold={.25}
        ListFooterComponent={renderActivityIndicator}
    />
)}

export default TestInventory;



