import { Button, Text, TextInput, StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./Profile";
import Inventory from "./Inventory";
import Decks from "./Decks";
import Login from "./Login";
import AllPrints from "./test_idea/AllPrints";
import baseCardSearch from "./test_idea/baseCardSearch";
import TestInventory from "./test_idea/testinvforinfscroll";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen style={styles.container} name="Profile" component={Profile} />
      <Tab.Screen name="Decks" component={Decks} />
      <Tab.Screen name="Inventory" component={Inventory} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="test" component={AllPrints} />
      <Tab.Screen name='BaseInv' component={baseCardSearch} />
      <Tab.Screen name='TestInv' component={TestInventory} />

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default Home;
